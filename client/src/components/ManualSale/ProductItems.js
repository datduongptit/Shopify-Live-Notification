import React, { useEffect } from "react";
import { Card, DataTable, Button, Pagination } from "@shopify/polaris";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProducts,
  getProduct,
  updateProduct,
  publishOrders,
  getProductByID,
} from "../../actions/manualSale";
import Moment from "react-moment";
import EditManualSales from "./EditManualSales";
import DeleteButton from "./DeleteButton";
import Spinner from "../contents/Spinner";

const ProductItems = ({
  getProducts,
  getProduct,
  products,
  manualSale: { loading },
  publishOrders,
  shop,
  getProductByID,
  item,
}) => {
  useEffect(() => {
    getProducts(shop);
  }, [shop]);
  const rows = [];
  products.map((product) => {
    return rows.push([
      product.last_name,
      product.city,
      product.products,
      <Moment format="MM/DD/YYYY  h:mm A">
        {product.order_date.replace(" ", "T")}
      </Moment>,
      0,
      0,
      <div style={{ display: "flex", padding: 0 }}>
        <div className="btn-publish" style={{ padding: "0 5px 5px 0" }}>
          <Button
            onClick={() => {
              publishOrders(shop, product.id, {
                publish_status: Math.abs(1 - product.publish_status),
              });
              getProducts(shop);
            }}
          >
            {product.publish_status === 1 ? (
              <i style={{ color: "#28a745" }} className="fas fa-toggle-on"></i>
            ) : (
              <i className="fas fa-toggle-off"></i>
            )}
          </Button>
        </div>
        <div style={{ padding: "0 5px 5px 0" }}>
          <EditManualSales shop={shop} products={product} />
          <span
            onClick={async () => {
              getProduct(shop, product._id);
              getProducts(shop);
            }}
          ></span>
        </div>

        <div style={{ padding: "0 5px 5px 0" }}>
          <DeleteButton shop={shop} id={product.id} />
        </div>
      </div>,
    ]);
  });
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Card>
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
            ]}
            headings={[
              "FIRST NAME",
              "CITY",
              "PRODUCT SELECTED",
              "ORDER DATE/TIME",
              "CLICKED TIMES",
              "IGNORED TIMES",
              "ACTION",
            ]}
            rows={rows}
          />
          <Pagination
            label="Page"
            hasPrevious
            onPrevious={() => {
              console.log("Previous");
            }}
            hasNext
            onNext={() => {
              console.log("Next");
            }}
          />
        </Card>
      )}
    </>
  );
};

ProductItems.propTypes = {
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
  getProducts,
  getProduct,
  updateProduct,
  publishOrders,
  getProductByID,
})(ProductItems);
