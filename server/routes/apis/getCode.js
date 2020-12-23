const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
// const verifyCall = require("../../verify");
const url = require("url");
const dateFormat = require("dateformat");
const request = require("request-promise");
const axios = require("axios");
const Shopify = require("shopify-api-node");
const ShopifyAPIClient = require("shopify-api-node");
const charge = require("../../charge");
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    conn.query(
      `SELECT * FROM tbl_appsettings WHERE id = ${process.env.APP_ID}`,
      async (error, results) => {
        if (error) throw error;
        const shop = req.query.shop;
        const code = req.query.code;
        const appId = process.env.APP_ID;
        const clientId = results[0].api_key;
        // const regex = /^[a-z\d_.-]+[.]myshopify[.]com$/;
        if (shop && code) {
          let accessTokenRequestUrl =
            "https://" + shop + "/admin/oauth/access_token";
          let accessTokenPayload = {
            client_id: clientId,
            client_secret: process.env.SHOPIFY_API_SECRET,
            code,
          };

          const data = await axios.post(
            accessTokenRequestUrl,
            accessTokenPayload
          );
          const accessToken = data.data.access_token;

          conn.query(
            `SELECT * FROM shop_installed WHERE shop = '${shop}' AND app_id = ${appId}`,
            async (err, results) => {
              if (err) throw err;
              const date = new Date();
              const currentDateInstalled =
                date.toISOString().split("T")[0] +
                " " +
                date.toTimeString().split(" ")[0];
              const registerWebhook = (shop, accessToken, webhook) => {
                const shopify = new Shopify({
                  shopName: shop,
                  accessToken: accessToken,
                });
                shopify.webhook.create(webhook).then(
                  (response) =>
                    console.log(
                      `webhook '${webhook.topic}' created '${JSON.stringify(
                        response
                      )}'.`
                    ),

                  (err) =>
                    console.log(
                      `err '${webhook.topic}'.${JSON.stringify(
                        err.response.body
                      )}`
                    )
                );
              };
              if (results.length !== 0) {
                const id = results[0].id;
                conn.query(
                  `SELECT * FROM tbl_usersettings WHERE store_name = '${shop}' AND app_id = ${appId}`,
                  async (err, datas) => {
                    if (datas.length === 0) {
                      registerWebhook(shop, accessToken, {
                        topic: "app/uninstalled",
                        address: `${process.env.APP_URL}/webhook/app/uninstalled`,
                        format: "json",
                      });
                      registerWebhook(shop, accessToken, {
                        topic: "products/update",
                        address: `${process.env.APP_URL}/webhook/products/update`,
                        format: "json",
                      });
                      registerWebhook(shop, accessToken, {
                        topic: "products/delete",
                        address: `${process.env.APP_URL}/webhook/products/update/product_delete`,
                        format: "json",
                      });
                      const options = {
                        method: "POST",
                        uri: `https://${shop}/admin/api/2020-10/script_tags.json`,
                        form: {
                          script_tag: {
                            event: "onload",
                            src:
                              "https://tdat.omegatheme.com/live-sale-notification/liveSale.js",
                          },
                        },
                        headers: {
                          "Content-Type": "application/json",
                          "X-Shopify-Access-Token": accessToken,
                        },
                      };
                      const response = await request(options);
                      const result = JSON.parse(response);
                      console.log(result);
                      conn.query(
                        `INSERT INTO tbl_usersettings SET access_token = '${accessToken}', store_name = '${shop}', app_id = ${appId}, installed_date = '${currentDateInstalled}', confirmation_url = ""`
                      );
                      res.redirect(
                        `/live-sale-notification/api/charge-require/${shop}`
                      );
                    } else {
                      conn.query(
                        `UPDATE tbl_usersettings SET access_token = '${accessToken}', store_name = '${shop}', app_id = ${appId}, installed_date = '${currentDateInstalled}', confirmation_url = "" WHERE id = ${id}`
                      );
                    }
                  }
                );

                const date_uninstalled = results[0].date_uninstalled;
                const date_installed = results[0].date_installed;
                const trialDays =
                  charge.trial_days -
                  Math.round((date_uninstalled - date_installed) / 86400000);
                // res.redirect(
                //   `/live-sale-notification/api/charge-require/${shop}`
                // );
              } else {
                const options = {
                  method: "GET",
                  uri: `https://${shop}/admin/api/2020-10/products.json?limit=250&fields=id,title,tags,handle,image,created_at,published_at,vendor,product_type`,
                  headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                  },
                };
                const response = await request(options);
                const result = JSON.parse(response);
                const dataProduct = [];
                result.products.map((product) => {
                  // console.log(product.image.src);
                  dataProduct.push([
                    product.id,
                    product.title,
                    product.handle,
                    product.image !== null ? product.image.src : "",
                    product.vendor,
                  ]);
                });
                if (dataProduct.length !== 0) {
                  conn.query(
                    `INSERT INTO notification_data_product (product_id, product_title, product_handle, images, shop) VALUES ?`,
                    [dataProduct]
                  );
                }
                conn.query(
                  `INSERT INTO tbl_usersettings SET access_token = '${accessToken}', store_name = '${shop}', app_id = ${appId}, installed_date = '${currentDateInstalled}', confirmation_url = ""`
                );
                conn.query(
                  `INSERT INTO shop_installed SET shop = '${shop}', app_id = ${appId}, date_installed = '${currentDateInstalled}'`
                );
                registerWebhook(shop, accessToken, {
                  topic: "app/uninstalled",
                  address: `${process.env.APP_URL}/webhook/app/uninstalled`,
                  format: "json",
                });
                registerWebhook(shop, accessToken, {
                  topic: "products/update",
                  address: `${process.env.APP_URL}/webhook/products/update`,
                  format: "json",
                });
                registerWebhook(shop, accessToken, {
                  topic: "products/delete",
                  address: `${process.env.APP_URL}/webhook/products/update/product_delete`,
                  format: "json",
                });
                const options1 = {
                  method: "POST",
                  uri: `https://${shop}/admin/api/2020-10/script_tags.json`,
                  form: {
                    script_tag: {
                      event: "onload",
                      src:
                        "https://tdat.omegatheme.com/live-sale-notification/liveSale.js",
                    },
                  },
                  headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                  },
                };
                const response1 = await request(options1);
                const resultt = JSON.parse(response1);
                // console.log("huhu", shop);
                // const { route, middleware } = shopify;
                // const { withShop, withWebhook } = middleware;
                res.redirect(
                  `/live-sale-notification/api/charge-require/${shop}`
                );
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get('/register-webhook', (req, res) => {
//   try {
//     conn.query()
//   } catch (err) {

//   }
// })

module.exports = router;
