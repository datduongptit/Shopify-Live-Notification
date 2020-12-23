const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");

// CREATE Notification Setting by shop
router.post("/:shop", async (req, res) => {
  const shop = req.params.shop;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    show_notifications,
    type_order,
    show_custom_order,
    count,
    status,
    TimeLoop,
    TimeDisplay,
    DateTime,
    show_device,
    textPopup,
    effect_display,
    effect_hidden,
    style,
    colorHighlight,
    colorText,
    colorDate,
    borderRadius,
    typeDate,
  } = req.body;

  const notiFields = {};
  if (show_notifications) notiFields.show_notifications = show_notifications;
  if (type_order) notiFields.type_order = type_order;
  if (show_custom_order) notiFields.show_custom_order = show_custom_order;
  if (count) notiFields.count = count;
  if (status) notiFields.status = status;
  if (TimeLoop) notiFields.TimeLoop = TimeLoop;
  if (TimeDisplay) notiFields.TimeDisplay = TimeDisplay;
  if (DateTime) notiFields.DateTime = DateTime;
  if (show_device) notiFields.show_device = show_device;
  if (textPopup) notiFields.textPopup = textPopup;
  if (effect_display) notiFields.effect_display = effect_display;
  if (effect_hidden) notiFields.effect_hidden = effect_hidden;
  if (style) notiFields.style = style;
  if (colorHighlight) notiFields.colorHighlight = colorHighlight;
  if (colorText) notiFields.colorText = colorText;
  if (colorDate) notiFields.colorDate = colorDate;
  if (borderRadius) notiFields.borderRadius = borderRadius;
  if (typeDate) notiFields.typeDate = typeDate;
  if (shop) notiFields.shop = shop;
  // if (status) {
  //     notiFields.status = status.split(',').map((item) => item.trim());
  //   }
  try {
    conn.query(
      `SELECT * FROM notification_view WHERE shop = '${shop}'`,
      (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0) {
          conn.query(
            "INSERT INTO notification_view SET ?",
            notiFields,
            async function (error, results, fields) {
              if (error) throw error;
              return res.send({
                error: false,
                data: results,
                message: "Created",
              });
            }
          );
        }
        conn.query(
          `UPDATE notification_view SET ? WHERE shop = '${shop}'`,
          notiFields,
          async function (error, results, fields) {
            if (error) throw error;
            return res.send(notiFields);
          }
        );
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET Notification by shop
router.get("/:shop", async (req, res) => {
  const shop = req.params.shop;
  const initialState = {
    borderRadius: "5",
    colorDate: "#000000",
    colorHighlight: "#e61414",
    colorText: "#1043da",
    effect_display: "bounceInLeft",
    effect_hidden: "fadeOutBig",
    count: "0",
    // status: "[pending]",
    style: "2",
    show_custom_order: "Random",
    show_device: "all",
    show_notifications: "0",
    textPopup: "Welcome",
    TimeDisplay: "5",
    TimeLoop: "10",
    DateTime: "d/m/y",
    type_order: "all",
    typeDate: "hour",
    shop: shop,
  };
  try {
    conn.query(
      `SELECT * FROM notification_view WHERE shop = '${shop}'`,
      (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0) {
          conn.query(`INSERT INTO notification_view SET ?`, initialState);
        }
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
