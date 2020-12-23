import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AddModal from "./AddModal";
import { connect } from "react-redux";
import { getProducts, getDataProduct } from "../../actions/manualSale";
// import ProductItems from "./ProductItems";
import Alert from "../Alert";
import Spinner from "../contents/Spinner";
// import GetProduct from "./GetProduct";
import ProductTable from "./ProductTable";

const AddNewSale = ({
  getProducts,
  manualSale: { products, productItem },
  shop,
  getDataProduct,
}) => {
  useEffect(() => {
    getProducts(shop);
    async function fetchData() {
      const response = await getDataProduct(shop);
      return response;
    }
    fetchData();
  }, [shop, products.id, getDataProduct, getProducts]);
  return (
    <div>
      {productItem === null ? (
        <Spinner />
      ) : (
        <div>
          <AddModal productItem={productItem} />
          <Alert />
          {/* <ProductItems shop={shop} products={products} /> */}
          <ProductTable
            productItem={productItem}
            shop={shop}
            products={products}
          />
        </div>
      )}
    </div>
  );
};

AddNewSale.propTypes = {
  getProducts: PropTypes.func.isRequired,
  manualSale: PropTypes.object.isRequired,
  getDataProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  manualSale: state.manualSale,
  shop: state.checkUrl.shop,
});

export default connect(mapStateToProps, {
  getProducts,
  getDataProduct,
})(AddNewSale);
