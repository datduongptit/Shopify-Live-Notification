const conn = require("./config/db");
const express = require("express");
const router = express.Router();
require("dotenv").config();
const app = express();

router.get("/", (req, res) => {
  try {
    conn.query(
      `SELECT * FROM tbl_appsettings WHERE id = ${process.env.APP_ID}`,
      async function (error, results, fields) {
        if (error) throw error;
        const shop = req.query.shop;
        const hmac = req.query.hmac;
        if (shop) {
          conn.query(
            `SELECT store_name FROM tbl_usersettings WHERE store_name = '${shop}' and app_id = ${process.env.APP_ID}`,
            (error, result) => {
              if (error) throw error;
              else if (result.length !== 0) {
                res.writeHead(302, {
                  // Location: `http://localhost:5000/api/shopifyApp?${hmac}&shop=${shop}`,
                  Location: `http://${shop}/admin/apps/test-app-live`,
                });
                res.end();
              } else {
                const permissions = [results[0].permissions];
                const api_key = results[0].api_key;
                const redirectUri = results[0].redirect_url;
                // const redirectUri = `${process.env.FORWARDING_ADDRESS}/auth/callback`;
                const permissionsURL = `https://${shop}/admin/oauth/request_grant?client_id=${api_key}&scope=${permissions}&redirect_uri=${redirectUri}`;
                res.writeHead(302, {
                  Location: `${permissionsURL}`,
                });
                res.end();
              }
            }
          );
        }
        // return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
