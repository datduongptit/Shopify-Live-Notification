const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// get data
router.post("/", async (req, res) => {
  const { id, title, handle, vendor } = req.body;
  const src = req.body.image !== null ? req.body.image.src : "No data";
  try {
    conn.query(
      `SELECT product_id FROM notification_data_product WHERE product_id=${id}`,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          console.log("created");
          conn.query(`INSERT INTO notification_data_product SET ?`, {
            product_id: id,
            product_title: title,
            product_handle: handle,
            images: src,
            shop: vendor,
          });
        } else {
          console.log("updated");
          conn.query(
            `UPDATE notification_data_product SET ? WHERE product_id = ${id}`,
            {
              product_id: id,
              product_title: title,
              product_handle: handle,
              images: src,
              shop: vendor,
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

router.post("/product_delete", async (req, res) => {
  const { id } = req.body;
  try {
    conn.query(
      `DELETE FROM notification_data_product WHERE product_id = ${id}`
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
