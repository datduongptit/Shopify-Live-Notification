const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");
const request = require("request-promise");

// GET notification_count
router.get("/", async (req, res) => {
  try {
    conn.query(`SELECT * FROM notification_count WHERE 1`, (err, data) => {
      if (err) throw err;
      return data[0];
    });
  } catch (err) {
    console.error(err);
  }
});

// Get by product_id
router.get("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    conn.query(
      `SELECT * FROM notification_count WHERE product_id=${product_id}`,
      (err, data) => {
        if (err) throw err;
        return data[0];
      }
    );
  } catch (err) {
    console.error(err);
  }
});

// DELETE by product_id
router.delete("/:product_id/:tgnew", async (req, res) => {
  const { product_id, tgnew } = req.params;
  try {
    conn.query(
      `DELETE FROM notification_count WHERE date < ${tgnew} AND product_id=${product_id}`,
      (err, data) => {
        if (err) throw err;
        return data[0];
      }
    );
  } catch (err) {
    console.error(err);
  }
});

//
router.get("/:shop/:id", async (req, res) => {
  try {
    conn.query(
      `SELECT DISTINCT ip FROM notification_count WHERE shop=${shop} AND product_id=${id}`,
      (err, data) => {
        if (err) throw err;
        return data[0];
      }
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
