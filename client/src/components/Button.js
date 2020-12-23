import React from "react";
import EditManualSales from "./ManualSale/EditManualSales";
import DeleteButton from "./ManualSale/DeleteButton";
const Button = ({ product, getProducts, publishOrders, getProduct }) => {
  return (
    <div>
      <div style={{ display: "flex", padding: 0, alignItems: "center" }}>
        <div>
          <button
            className={
              product.publishOrder === 1 ? "btn btn-success" : "btn btn-edit"
            }
            onClick={() => {
              publishOrders(product.id, {
                publishOrder: Math.abs(1 - product.publishOrder),
              });
              getProducts();
            }}
          >
            {product.publishOrder === 1 ? (
              <span style={{ fontSize: "12px" }}>Unpublish</span>
            ) : (
              <span>Publish</span>
            )}
          </button>
        </div>
        <div style={{ alignItems: "center" }}>
          <EditManualSales products={product} />
          <span onClick={() => getProduct(product._id)}></span>
        </div>
        <div>
          <DeleteButton id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default Button;
