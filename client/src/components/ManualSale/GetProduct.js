import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { getDataProduct } from "../../actions/manualSale";
const GetProduct = ({ getDataProduct }) => {
  const optionsProduct = [];
  async function getData() {
    return await axios.get("/api/data_product");
  }

  (async function getItem() {
    const res = await getData();
    res.data.map((item) => {
      return optionsProduct.push({
        label: item["COL 1"],
        value: item["COL 1"],
      });
    });
  })();
  return (
    <div>
      <div style={{ width: "250px" }}>
        <div className="form-group">
          <select className="form-select" name="product">
            {optionsProduct.map((product, index) => (
              <option key={index} value={product.value}>
                {product.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

GetProduct.propTypes = {
  getDataProduct: PropTypes.func.isRequired,
};

export default connect(null, { getDataProduct })(GetProduct);
