const express = require("express");
const nonce = require("get-nonce");
const querystring = require("querystring");
const axios = require("axios");
const crypto = require("crypto");
const Shopify = require("shopify-api-node");
const router = express.Router();
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;
const forwardingAddress = process.env.FORWARDING_ADDRESS;
const scopes = "read_script_tags,write_script_tags";
const conn = require("../../config/db");
// routes
router.get("/shopify", async (req, res) => {
  const { shop } = req.query;
  if (shop) {
    const state = nonce();
    const redirectUrl = `${forwardingAddress}/shopify/callback`;
    const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&state=${state}&redirect_uri=${redirectUri}`;

    res.cookie("state", state);
    res.redirect(installUrl);
  } else {
    return res
      .status(400)
      .send(
        "Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your request"
      );
  }
});

router.get("/shopify/callback", async (req, res) => {
  const { state, shop, hmac, code } = req.query;
  const stateCookie = req.cookies.state;
  if (state !== stateCookie) {
    return res.status(403).send("Request origin cannot be verified");
  }
  if (shop && hmac && code) {
    const map = { ...req.query };
    delete map.signature;
    delete map.hmac;
    const message = querystring.stringify(map);
    const provideHmac = Buffer.from(message, "base64");
    const generatedHash = Buffer.from(
      crypto.createHmac(sha256, apiSecret).update(message).digest("hex"),
      "utf8"
    );
  }
  let hashEquals = false;
  try {
    hashEquals = crypto.timingSafeEqual(generatedHash, provideHmac);
  } catch (err) {
    hashEquals = false;
  }
  if (!hashEquals) {
    return res.status(400).send("Hmac validation failded");
  }

  const accessTokenRequestUrl = `https://${shop}/admin/oauth.access_token`;
  const acessTokenPayload = {
    client_id: apiKey,
    client_secret: apiSecret,
    code,
  };
  const select_settings = conn.query(
    `SELECT * FROM tbl_usersettings WHERE id = ${appId}`
  );
  try {
    const [{ data }, shopExist] = await Promise.all([
      axios.post(accessTokenRequestUrl, acessTokenPayload),
      conn.query(
        `SELECT store_name FROM tbl_usersettings WHERE store_name = ${shop}`
      ),
    ]);
    const accessToken = data.access_token;

    res.cookie("store_name", Buffer.from(shop).toString("base64"));
    res.cookie("accessToken", Buffer.from(accessToken).toString("base64"));
    res.cookie("apiKey", Buffer.from(apiKey).toString("base64"));

    // save shop to database if it's not exist;
    const date =
      new Date().getDate() +
      "/" +
      new Date().getMonth() +
      "/" +
      new Date().getFullYear();
    if (!shopExist) {
      const shopify = new Shopify({
        shopName: shop,
        accessToken,
      });
      conn.query(
        `INSERT INTO tbl_usersettings SET access_token = ${accessToken}, app_id = ${appId}, store_name = ${shop}, installed_date = ${date}, confirmation_url = ''`,
        function (err, result) {
          if (error) throw error;
          return res.send(results);
        }
      );
      const trialDays =
        pricingConfig.trial_day -
        Math.round((shopExist.unInstalledDate = shop.createAt) / 86400000);
    } else {
      conn.query(
        `INSERT INTO tbl_usersettings SET access_token = ${accessToken}, app_id = ${appId}, store_name = ${shop}, installed_date = ${date}, confirmation_url = ''`
      );
      conn.query(
        `INSERT INTO shop_installed SET shop = ${shop}, app_id = ${appId}, installed_date = ${date}`
      );
    }
    db.query(`INSERT INTO notifications_view(shop) values ${shop}`);
    db.query(`INSERT INTO notifications_realtime(shop) values ${shop}`);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
