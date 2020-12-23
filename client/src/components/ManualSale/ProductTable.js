import React, { useEffect } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@shopify/polaris";
import {
  getProducts,
  getProduct,
  updateProduct,
  publishOrders,
  getProductByID,
} from "../../actions/manualSale";
import EditManualSales from "./EditManualSales";
import DeleteButton from "./DeleteButton";
import axios from "axios";

const ProductTable = ({
  getProducts,
  getProduct,
  manualSale: { loading, productID },
  publishOrders,
  products,
  shop,
  productItem,
  getProductByID,
}) => {
  useEffect(() => {
    getProducts(shop);
  }, [shop, getProducts]);

  const columns = [
    {
      title: "FIRST NAME",
      width: 80,
      dataIndex: "first_name",
      key: "name",
    },
    {
      title: "CITY",
      width: 50,
      dataIndex: "city",
      key: "city",
    },
    {
      title: "PRODUCT SELECTED",
      dataIndex: "products",
      key: "1",
      width: 150,
    },
    {
      title: "ORDER DATE/TIME",
      dataIndex: "created_at",
      key: "2",
      width: 120,
    },
    {
      title: "CLICKED TIMES",
      dataIndex: "click_product",
      key: "3",
      width: 100,
    },
    {
      title: "IGNORED TIMES",
      dataIndex: "close_popup",
      key: "4",
      width: 100,
    },
    {
      title: "ACTION",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (item) => {
        return (
          <div style={{ display: "flex", padding: 0 }}>
            <div className="btn-publish" style={{ padding: "0 5px 5px 0" }}>
              <Button
                onClick={() => {
                  publishOrders(item.shop, item.id, {
                    status: Math.abs(1 - item.status),
                  });
                  getProducts(item.shop);
                }}
              >
                {item.status === 1 ? (
                  <i
                    style={{ color: "#28a745" }}
                    className="fas fa-toggle-on"
                  ></i>
                ) : (
                  <i className="fas fa-toggle-off"></i>
                )}
              </Button>
            </div>
            <div style={{ padding: "0 5px 5px 0" }}>
              <EditManualSales
                productItem={productItem}
                shop={item.shop}
                products={item}
                productID={productID}
              />
              <span
                onClick={async () => {
                  getProduct(item.shop, item.id);
                  // await getProducts(item.shop);
                }}
              ></span>
            </div>
            <div style={{ padding: "0 5px 5px 0" }}>
              <DeleteButton shop={item.shop} id={item.id} />
            </div>
          </div>
        );
      },
    },
  ];
  const data = [];
  products.map((product, index) => {
    return data.push({
      key: index,
      last_name: product.last_name,
      first_name: product.first_name,
      click_product: product.click_product,
      close_popup: product.close_popup,
      city: product.city,
      items: productID,
      products: product.product_id,
      created_at: product.created_at,
      shop: product.shop,
      status: product.status,
      id: product.id,
    });
  });
  return (
    <div>
      <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 400 }} />
    </div>
  );
};

ProductTable.propTypes = {
  getProducts: PropTypes.func.isRequired,
  manualSale: PropTypes.object.isRequired,
  getProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
  publishOrders: PropTypes.func.isRequired,
  getProductByID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  manualSale: state.manualSale,
});

export default connect(mapStateToProps, {
  getProduct,
  getProducts,
  updateProduct,
  publishOrders,
  getProductByID,
})(ProductTable);
