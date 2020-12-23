import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  PRODUCT_ERROR,
  PUBLISH_PRODUCT,
  GET_DATA,
  GET_PRODUCT_BY_ID,
} from "../constants/constants";

// Get all product
export const getProducts = (shop) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/live-sale-notification/api/notification_fake/${shop}`
    );
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
    // dispatch(setAlert('Update the product success', 'success'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// publish
export const publishOrders = (shop, id, value) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/live-sale-notification/api/notification_fake/status/${shop}/${id}`,
      value,
      config
    );
    dispatch({
      type: PUBLISH_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert("Change publish the product successful", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add product
export const addProduct = (formData, shop) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/live-sale-notification/api/notification_fake/${shop}`,
      formData,
      config
    );

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert("Product Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({
      type: PRODUCT_ERROR,
    });
  }
};

// Get product by params id
export const getProduct = (shop, id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/live-sale-notification/api/notification_fake/${shop}/${id}`
    );

    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    });
    // dispatch(setAlert("Reset the statistic successful", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get data product
export const getDataProduct = (shop) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/live-sale-notification/api/notification_fake/get_product/products/${shop}`
    );

    dispatch({
      type: GET_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get data product by ID
export const getProductByID = (id) => async (dispatch) => {
  const res = await axios.get(
    `/live-sale-notification/api/notification_fake/get_product/product/${id}`
  );
  try {
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Update product
export const updateProduct = (shop, id, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(
      `/live-sale-notification/api/notification_fake/${shop}/${id}`,
      formData,
      config
    );
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data,
    });
    dispatch(setAlert("Update the product success", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Product
export const deleteProduct = (id, shop) => async (dispatch) => {
  try {
    await axios.delete(
      `/live-sale-notification/api/notification_fake/${shop}/${id}`
    );

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

    dispatch(setAlert("Remove product successful", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
