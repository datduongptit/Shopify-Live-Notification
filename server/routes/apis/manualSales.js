const express = require("express");
const router = express.Router();
const conn = require("../../config/db");
const { check, validationResult } = require("express-validator");
const request = require("request-promise");

// GET all Manual Sales
router.get("/:shop", async (req, res) => {
  const shop = req.params.shop;
  try {
    let x;
    const a = (item) => {
      return conn.query(
        `SELECT product_title FROM notification_data_product WHERE product_id = ${item.products}`,
        (err, data) => {
          x = data[0].product_title;
          console.log(x);
          return x;
        }
      );
    };
    let arr = [];
    conn.query(
      `SELECT * FROM notification_fake WHERE shop = '${shop}'`,
      async function (error, results, fields) {
        if (error) throw error;
        let length = results.length;
        results.map(async (item) => {
          conn.query(
            `SELECT product_title FROM notification_data_product WHERE product_id = ${item.products}`,
            (err, data) => {
              item.product_id = data[0].product_title;
              if (length !== 0) {
                arr.push(item);
                length--;
              }
              if (length == 0) {
                res.send(arr);
              }
            }
          );
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET Manual Sales by ID
router.get("/:shop/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let shop = req.params.shop;
    if (!id) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide id" });
    }

    conn.query(
      `SELECT * FROM notification_fake where shop = '${shop}' AND id= ${id}`,
      function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET Products by Shop
router.get("/get_product/products/:shop", async (req, res) => {
  const shop = req.params.shop;
  const scope = "id, title, handle";
  try {
    conn.query(
      `SELECT * FROM tbl_usersettings WHERE store_name = '${shop}'`,
      async (err, results) => {
        if (err) throw err;
        const { access_token } = results[0];
        const options = {
          method: "GET",
          uri: `https://${shop}/admin/api/2020-10/products.json?limit=250&fields=id,title,tags,handle,image,created_at,published_at,vendor,product_type`,
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": access_token,
          },
        };
        const response = await request(options);
        const result = JSON.parse(response);
        const dataProduct = [];
        result.products.map((product) => {
          // console.log(product.image.src);
          dataProduct.push([
            product.id,
            product.title,
            product.handle,
            product.image !== null ? product.image.src : "",
            product.vendor,
          ]);
        });
        return res.send(result);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get product item by id
router.get("/get_product/product/:id", async (req, res) => {
  const { id } = req.params;
  try {
    conn.query(
      `SELECT product_title FROM notification_data_product WHERE product_id = ${id}`,
      (error, result) => {
        if (error) throw error;
        return res.json(result[0].product_title);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get product by id
// router.get("get_product/");

//POST Create a new Manual Sales
router.post(
  "/:shop",
  [
    check("first_name", "Firstname is required").not().isEmpty(),
    check("last_name", "Lastname is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("products", "Product is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const shop = req.params.shop;
    const {
      first_name,
      last_name,
      city,
      products,
      created_at,
      status,
      click_product,
      close_popup,
    } = req.body;
    try {
      conn.query(
        `INSERT INTO notification_fake SET ?`,
        {
          first_name: first_name,
          last_name: last_name,
          city: city,
          products: products,
          created_at: created_at.split("T")[0] + " " + created_at.split("T")[1],
          status: status,
          click_product: click_product,
          close_popup: close_popup,
          shop: shop,
        },
        async (error, results, fields) => {
          if (error) throw error;
          return await res.send({
            first_name: first_name,
            last_name: last_name,
            city: city,
            products: products,
            created_at: created_at,
            status: Number(status),
            click_product,
            close_popup,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// UPDATE Manual Sales by ID
router.put("/:shop/:id", async (req, res) => {
  const { id, shop } = req.params;
  const {
    first_name,
    last_name,
    city,
    products,
    created_at,
    status,
    click_product,
    close_popup,
  } = req.body;

  let manualFeilds = {};
  if (first_name) manualFeilds.first_name = first_name;
  if (last_name) manualFeilds.last_name = last_name;
  if (city) manualFeilds.city = city;
  if (status) manualFeilds.status = status;
  if (products) manualFeilds.products = products;
  if (created_at)
    manualFeilds.created_at =
      created_at.split("T")[0] + " " + created_at.split("T")[1];
  if (click_product) manualFeilds.click_product = click_product;
  if (close_popup) manualFeilds.close_popup = close_popup;
  if (shop) manualFeilds.shop = shop;

  try {
    conn.query(
      `UPDATE notification_fake SET ? WHERE shop = '${shop}' AND id = ${id}`,
      manualFeilds,
      function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update publish created_at
router.put("/status/:shop/:id", async (req, res) => {
  try {
    const { id, shop } = req.params;
    const status = req.body;
    conn.query(
      `UPDATE notification_fake SET ? WHERE shop = '${shop}' AND id = ${id}`,
      status,
      (error, results, fields) => {
        if (error) throw error;
        return res.send(results);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE Manual Sales
router.delete("/:shop/:id", async (req, res) => {
  const { id, shop } = req.params;
  try {
    conn.query(
      `DELETE FROM notification_fake WHERE shop = '${shop}' AND id = ${id}`,
      [id],
      function (error, results, fields) {
        if (error) throw error;
        return res.send({
          error: false,
          data: results,
          message: "Delete successfully",
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
