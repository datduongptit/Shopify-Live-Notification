const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");
const url = require("url");
// GET realtimeSetting by Shop
router.get("/:shop", async (req, res) => {
  const shop = req.params.shop;
  const initialState = {
    layOut: "gradient",
    status: "0",
    bg_left: "red",
    bg_right: "green",
    bg_popup: "black",
    min: "0",
    max: "0",
    text_display: `Welcome to shop '${shop}'`,
    colorText: "#fff",
    style: 2,
    shop: `${shop}`,
  };
  try {
    conn.query(
      `SELECT * FROM notification_visit WHERE shop = '${shop}'`,
      (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0) {
          conn.query(`INSERT INTO notification_visit SET ?`, initialState);
        }
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// POST & UPDATE realtimeSetting by shop
router.post("/:shop", async (req, res) => {
  const shop = req.params.shop;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    layOut,
    status,
    bg_left,
    bg_right,
    bg_popup,
    min,
    max,
    text_display,
    colorText,
    style,
  } = req.body;

  // build ReatimeSettings object
  const realtimeFields = {};
  if (status) {
    realtimeFields.status = status;
  } else {
    realtimeFields.status = 0;
  }
  if (layOut) {
    realtimeFields.layOut = layOut;
  } else {
    realtimeFields.layOut = "gradient";
  }
  if (bg_left) {
    realtimeFields.bg_left = bg_left;
  } else {
    realtimeFields.bg_left = "red";
  }
  if (bg_right) {
    realtimeFields.bg_right = bg_right;
  } else {
    realtimeFields.bg_right = "green";
  }
  if (bg_popup) {
    realtimeFields.bg_popup = bg_popup;
  } else {
    realtimeFields.bg_popup = "orange";
  }
  if (text_display) {
    realtimeFields.text_display = text_display;
  } else {
    realtimeField.text_display = "Welcome";
  }
  if (colorText) {
    realtimeFields.colorText = colorText;
  } else {
    realtimeField.colorText = "#000";
  }
  if (style) {
    realtimeFields.style = style;
  } else {
    realtimeFields.style = 2;
  }
  if (min) {
    realtimeFields.min = min;
  } else {
    realtimeFields.min = 0;
  }
  if (max) {
    realtimeFields.max = max;
  } else {
    realtimeFields.max = 0;
  }
  if (shop) realtimeFields.shop = shop;
  try {
    conn.query(
      `SELECT * FROM notification_visit WHERE shop = '${shop}'`,
      (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0) {
          conn.query(
            `INSERT INTO notification_visit SET ?`,
            realtimeFields,
            async (error, results, fields) => {
              if (error) throw error;
              res.send(results);
            }
          );
        }
        conn.query(
          `UPDATE notification_visit SET ? WHERE shop = '${shop}'`,
          realtimeFields,
          (error, results, fields) => {
            if (error) throw error;
            res.send(realtimeFields);
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
