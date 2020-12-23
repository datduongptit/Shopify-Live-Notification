const conn = require("../../config/db");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const request = require("request-promise");
const app = express();

router.get("/:shop", async (req, res) => {
  const chargeId = req.query.charge_id;
  conn.query(
    `SELECT * FROM tbl_usersettings WHERE store_name = '${req.params.shop}'`,
    async (err, data) => {
      if (err) throw err;
      const { access_token, store_name } = data[0];
      const options = {
        method: "POST",
        uri: `https://${store_name}/admin/api/2020-10/recurring_application_charges/${chargeId}/activate.json/`,
        form: {
          recurring_application_charge: {
            id: chargeId,
            name: "Sales Pop",
            price: 4,
            status: "accepted",
            return_url: `${process.env.APP_URL}/api/check-charge/${store_name}`,
            test: "TEST_MODE",
            decorated_return_url: `${process.env.APP_URL}/api/check-charge/${store_name}?charge_id=${chargeId}`,
          },
        },
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": access_token,
        },
      };
      const dataResponse = await request(options);
      const result = JSON.parse(dataResponse);
      console.log(result["recurring_application_charge"].status);
      const status = result["recurring_application_charge"].status;
      conn.query(
        `UPDATE tbl_usersettings SET status = '${status}' WHERE store_name = '${store_name}'`
      );
      res.redirect(`http://${store_name}/admin/apps/test-app-live`);
    }
  );
});

router.get("/check-active/:shop", async (req, res) => {
  const shop = req.params.shop;
  try {
    conn.query(
      `SELECT confirmation_url, status FROM tbl_usersettings WHERE store_name = '${shop}'`,
      async (err, result) => {
        if (err) throw err;
        return res.json(result[0]);
      }
    );
  } catch (err) {
    console.error("errrr", err.message);
  }
});

module.exports = router;
