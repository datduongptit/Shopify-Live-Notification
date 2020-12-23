import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  Layout,
  TextStyle,
  Select,
  Button,
  TextField,
} from "@shopify/polaris";
import {
  updateProduct,
  getProducts,
  getProduct,
  getProductByID,
} from "../../actions/manualSale";
import { connect } from "react-redux";

const EditManualSales = ({
  products,
  updateProduct,
  getProducts,
  getProduct,
  shop,
  productItem,
  getProductByID,
  productID,
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const [selectedProduct, setSelectedProduct] = useState(productID);
  const handleChangeProduct = useCallback(
    (value) => setSelectedProduct(value),
    []
  );
  const optionsProduct = [];
  productItem.products.map((item, key) => {
    return optionsProduct.push({
      label: item.title,
      value: JSON.stringify(item.id),
      key: item.id,
    });
  });

  const [selectedCustomer, setSelectedCustomer] = useState(products.products);
  const handleChangeCustomer = useCallback(
    (value) => setSelectedCustomer(value),
    []
  );

  const [checked, setChecked] = useState(products.status);
  // const handleChangeCheck = useCallback((newChecked) => setChecked(newChecked), []);
  const options = [
    { label: "Select Customer", value: "Select Customer" },
    { label: "Edit Customer", value: "Edit Customer" },
  ];

  const [selected, setSelected] = useState("Edit Customer");
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const [firstName, setFirstName] = useState(products.first_name);
  const handleChangeFirstName = useCallback(
    (newValue) => setFirstName(newValue),
    []
  );

  const [lastName, setLastName] = useState(products.last_name);
  const handleChangeLastName = useCallback(
    (newValue) => setLastName(newValue),
    []
  );

  const [city, setCity] = useState(products.city);
  const handleChangeCity = useCallback((newValue) => setCity(newValue), []);

  const initialState = {
    status: "",
    first_name: products.first_name,
    last_name: "",
    city: "",
    products: "",
    created_at: "",
  };
  const [formData, setFormData] = useState(initialState);

  formData.products = selectedProduct;
  formData.first_name = firstName;
  formData.last_name = lastName;
  formData.city = city;
  formData.status = checked === true ? "1" : "0";
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(shop, products.id, formData);
    await getProducts(shop);
    // getProduct(shop, products.id);
    handleChange();
  };

  const activator = (
    <div className="btn-edit">
      <Button
        onClick={() => {
          handleChange();
          getProducts(shop);
        }}
      >
        <span className="edit-icon">
          <i className="far fa-edit"></i>
        </span>
      </Button>
    </div>
  );

  return (
    <>
      <div>
        <Modal
          large
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Edit Order Product"
          primaryAction={{
            content: "OK",
            onAction: onSubmit,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <div className="mb-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Publish Order</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <input
                    type="checkbox"
                    name="pulishOrder"
                    value={products.status}
                    defaultChecked={Boolean(products.status)}
                    onChange={() => setChecked(!checked)}
                  />
                </Layout.Section>
              </Layout>
            </div>
            {/* <Customer /> */}
            <div className="mb-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Customer</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <div style={{ width: "250px" }}>
                    <Select
                      options={options}
                      onChange={handleSelectChange}
                      value={selected}
                    />
                  </div>
                </Layout.Section>
              </Layout>
              {selected === "Edit Customer" ? (
                <div className="mt-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Edit Customer</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="mb-3">
                        <TextField
                          value={firstName}
                          name="firstName"
                          onChange={handleChangeFirstName}
                          placeholder="First name"
                          clearButton
                          onClearButtonClick={() => setFirstName("")}
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          value={lastName}
                          onChange={handleChangeLastName}
                          placeholder="Last name"
                        />
                      </div>
                      <div className="mb-3">
                        <TextField
                          value={city}
                          onChange={handleChangeCity}
                          placeholder="City"
                        />
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <SelectCustomer /> */}
            <div>
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Select Customer</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <div style={{ width: "250px" }}>
                    <div className="form-group">
                      <Select
                        options={[
                          {
                            label: "Select Customers",
                            value: "Select Customers",
                          },
                        ]}
                        value={selectedCustomer}
                        onChange={handleChangeCustomer}
                      />
                    </div>
                  </div>
                </Layout.Section>
              </Layout>
            </div>

            {/* <SelectProduct /> */}
            <div className="mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Select Products</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <div style={{ width: "250px" }}>
                    <div className="form-group">
                      <Select
                        options={optionsProduct}
                        value={selectedProduct}
                        onChange={handleChangeProduct}
                      />
                    </div>
                  </div>
                </Layout.Section>
              </Layout>
            </div>

            {/* <OrderDate /> */}
            <div className="mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Custom Text</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <input
                    onChange={onChange}
                    defaultValue={products.created_at.replace(" ", "T")}
                    name="created_at"
                    style={{
                      width: "90%",
                      height: "40px",
                      backgroundColor: "#fcfdfd",
                      borderRadius: "4px",
                      border: "1px solid rgb(209, 202, 202)",
                      boxShadow: "-2px 4px 19px 1px rgba(230, 227, 227, 0.75)",
                    }}
                    type="datetime-local"
                  />
                </Layout.Section>
              </Layout>
            </div>
          </Modal.Section>
        </Modal>
      </div>
    </>
  );
};

EditManualSales.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  getProductByID: PropTypes.func.isRequired,
};

export default connect(null, {
  updateProduct,
  getProducts,
  getProduct,
  getProductByID,
})(EditManualSales);
