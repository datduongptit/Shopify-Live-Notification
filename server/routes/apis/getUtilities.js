const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");
const request = require("request-promise");

router.get(`/:shop`, (req, res) => {
  const shop = req.params.shop;
  try {
    conn.query(
      `SELECT * FROM tbl_usersettings WHERE store_name='${shop}' and app_id=78`,
      (err, result) => {
        if (err) throw err;
        const data = result[0];
        return res.send(data);
      }
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
