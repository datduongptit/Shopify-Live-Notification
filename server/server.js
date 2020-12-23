const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const conn = require("./config/db");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/live-sale-notification/api/shopifyApp", require("./shopifyApp"));
app.use(
  "/live-sale-notification/auth/callback",
  require("./routes/apis/getCode")
);
app.use(
  "/live-sale-notification/api/charge-require",
  require("./routes/apis/chargeRequire")
);
app.use(
  "/live-sale-notification/api/check-charge",
  require("./routes/apis/checkCharge")
);
app.use(
  "/live-sale-notification/webhook/app/uninstalled",
  require("./routes/apis/checkApp")
);
app.use(
  "/live-sale-notification/api/notification_fake",
  require("./routes/apis/manualSales")
);
app.use(
  "/live-sale-notification/api/notification_view",
  require("./routes/apis/notificationView")
);
app.use(
  "/live-sale-notification/webhook/products/update",
  require("./routes/apis/checkUpdateProduct")
);
app.use(
  "/live-sale-notification/api/notification_visit",
  require("./routes/apis/notificationRealtime")
);
app.use(
  "/live-sale-notification/api/notification_count",
  require("./routes/apis/notificationCount")
);
app.use(
  "/live-sale-notification/api/getUtilities",
  require("./routes/apis/getUtilities")
);

if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "../client/public")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "public", "index.html"));
    console.log("dev");
    try {
      conn.query(
        `SELECT * FROM tbl_appsettings WHERE id = ${process.env.APP_ID}`,
        async function (error, results, fields) {
          if (error) throw error;
          const shop = req.query.shop;
          const hmac = req.query.hmac;
          const { api_key, redirect_url } = results[0];
          const permissions = [results[0].permissions];
          const permissionsURL = `https://${shop}/admin/oauth/request_grant?client_id=${api_key}&scope=${permissions}&redirect_uri=${redirect_url}`;
          if (shop) {
            conn.query(
              `SELECT * FROM tbl_usersettings WHERE store_name = '${shop}' and app_id = ${process.env.APP_ID}`,
              (error, result) => {
                if (error) throw error;
                else if (result.length !== 0) {
                  const status = result[0].status;
                  if (status === "active") {
                    console.log("active");
                  } else {
                    res.redirect(`${permissionsURL}`);
                  }
                  // res.end();
                } else {
                  res.redirect(`${permissionsURL}`);
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
} else {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("/*", (req, res) => {
    console.log("prod");
    try {
      conn.query(
        `SELECT * FROM tbl_appsettings WHERE id = ${process.env.APP_ID}`,
        async function (error, results, fields) {
          if (error) throw error;
          const shop = req.query.shop;
          const hmac = req.query.hmac;
          const { api_key, redirect_url, store_name } = results[0];
          const permissions = [results[0].permissions];
          const permissionsURL = `https://${shop}/admin/oauth/request_grant?client_id=${api_key}&scope=${permissions}&redirect_uri=${redirect_url}`;
          if (shop || store_name) {
            conn.query(
              `SELECT * FROM tbl_usersettings WHERE store_name = '${shop}' and app_id = ${process.env.APP_ID}`,
              (error, result) => {
                if (error) throw error;
                else if (result.length !== 0) {
                  const status = result[0].status;
                  if (status === "active") {
                    console.log("active");

                    return res
                      .status(200)
                      .sendFile(
                        path.join(
                          __dirname,
                          "..",
                          "client",
                          "build",
                          "index.html"
                        )
                      );
                  } else {
                    console.log("unactive");
                    // return res.redirect(
                    //   `/live-sale-notification/api/charge-require/check-active/${shop}`
                    // );
                    return res
                      .status(200)
                      .sendFile(path.join(__dirname, "test.html"));
                  }
                  // res.end();
                } else {
                  res.redirect(`${permissionsURL}`);
                }
              }
            );
          } else {
            console.log("not shop");
            res.status(400).json("error");
          }
          // return res.send(results);
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
