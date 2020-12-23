const conn = require("../../config/db");
const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { domain, phone, country, email, name, iana_timezone } = req.body;
    const currentDate = new Date();
    const currentDateUninstalled =
      currentDate.toISOString().split("T")[0] +
      " " +
      currentDate.toTimeString().split(" ")[0];
    // Update uninstall date
    conn.query(
      `UPDATE shop_installed SET date_uninstalled = '${currentDateUninstalled}', name_shop = '${name}', phone = '${phone}', email_shop = '${email}', timezone = '${iana_timezone}', country = '${country}' WHERE shop='${domain}'`
    );
    // Delete
    conn.query(`DELETE FROM tbl_usersettings where store_name = '${domain}'`);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
