const express = require("express");
const conn = require("../../config/db");
const app = new express();
const router = express.Router();
const request = require("request-promise");

router.get("/getCharge/:shop/:charge_id", (req, res) => {
  try {
    conn.query(
      `SELECT * FROM tbl_usersettings WHERE store_name = '${req.params.shop}'`,
      async (err, result) => {
        if (err) throw err;
        const chargeId = req.params.charge_id;
        const { access_token, store_name, id } = result[0];
        if (store_name) {
          try {
            const options = {
              method: "GET",
              uri: `https://${store_name}/admin/api/2020-10/application_charges/${chargeId}.json`,
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": access_token,
              },
            };
            const response = await request(options);
            const result = JSON.parse(response);
            // const confirmationUrl =
            //   result["application_charge"].confirmation_url;
            // conn.query(
            //   `UPDATE tbl_usersettings SET confirmation_url='${confirmationUrl}' WHERE id=${id}`
            // );
            res.json(result);
          } catch (err) {
            console.error("err", err.message);
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:shop", async (req, res) => {
  try {
    conn.query(
      `SELECT * FROM tbl_usersettings WHERE store_name = '${req.params.shop}'`,
      async (err, result) => {
        if (err) throw err;
        const { access_token, store_name, id } = result[0];
        if (store_name) {
          try {
            const options = {
              method: "POST",
              uri: `https://${store_name}/admin/api/2020-10/recurring_application_charges.json`,
              form: {
                recurring_application_charge: {
                  name: "Sales Pop",
                  price: 4,
                  test: true,
                  return_url: `${process.env.APP_URL}/api/check-charge/${store_name}`,
                },
              },
              headers: {
                "Content-Type": "application/json",
                "X-Shopify-Access-Token": access_token,
              },
            };
            const response = await request(options);
            const result = JSON.parse(response);
            const confirmationUrl =
              result["recurring_application_charge"].confirmation_url;
            conn.query(
              `UPDATE tbl_usersettings SET confirmation_url='${confirmationUrl}' WHERE id=${id}`
            );
            return res.redirect(`${confirmationUrl}`);
            // res.json(result);
          } catch (err) {
            console.error("errrr", err.message);
          }
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
