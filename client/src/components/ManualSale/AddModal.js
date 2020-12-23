import React, { useCallback, useState } from "react";
import {
  Modal,
  Layout,
  TextStyle,
  Select,
  Button,
  TextField,
} from "@shopify/polaris";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addProduct, getProducts } from "../../actions/manualSale";
const AddModal = ({
  addProduct,
  getProducts,
  checkUrl: { shop },
  productItem: { products },
}) => {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const optionsProduct = [];
  products.map((item, key) =>
    optionsProduct.push({
      label: item.title,
      value: JSON.stringify(item.id),
      key: item.id,
    })
  );

  const [selectedProduct, setSelectedProduct] = useState(
    optionsProduct.length !== 0 ? optionsProduct[0].value : ""
  );
  const handleChangeProduct = useCallback(
    (value) => setSelectedProduct(value),
    []
  );

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const handleChangeCustomer = useCallback(
    (value) => setSelectedCustomer(value),
    []
  );

  const [selected, setSelected] = useState("Select Customer");

  const [checked, setChecked] = useState(true);

  const defaultDate =
    new Date().toISOString().split("T")[0] +
    "T" +
    new Date().toTimeString().split(" ")[0];
  const options = [
    { label: "Select Customer", value: "Select Customer" },
    { label: "Add Customer", value: "Add Customer" },
  ];
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const [firstName, setFirstName] = useState("");
  const handleChangeFirstName = useCallback(
    (newValue) => setFirstName(newValue),
    []
  );

  const [lastName, setLastName] = useState("");
  const handleChangeLastName = useCallback(
    (newValue) => setLastName(newValue),
    []
  );

  const [city, setCity] = useState("");
  const handleChangeCity = useCallback((newValue) => setCity(newValue), []);

  const initialState = {
    status: "",
    first_name: "",
    last_name: "",
    city: "",
    products: "",
    created_at: defaultDate,
    click_product: "0",
    close_popup: "0",
  };

  const resetFormData = () => {
    setFirstName("");
    setLastName("");
    setCity("");
  };

  const [formData, setFormData] = useState(initialState);
  formData.products = selectedProduct;
  formData.status = checked;
  formData.first_name = firstName;
  formData.last_name = lastName;
  formData.city = city;
  const { order } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      addProduct(formData, shop);
      resetFormData();
      setFormData(initialState);
      getProducts(shop);
      handleChange();
    },
    [firstName, lastName]
  );
  const activator = (
    <Button primary onClick={handleChange}>
      Add new manual sale
    </Button>
  );
  return (
    <div className="mb-3">
      <Modal
        large
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Add Order Product"
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
                  name="publishOrder"
                  value={checked}
                  checked={checked}
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
            {selected === "Add Customer" ? (
              <div className="mt-3">
                <Layout>
                  <Layout.Section secondary>
                    <TextStyle variation="strong">Add Customer</TextStyle>
                  </Layout.Section>
                  <Layout.Section>
                    <div className="mb-3">
                      <TextField
                        value={firstName}
                        onChange={handleChangeFirstName}
                        placeholder="First name"
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
                  <Select
                    onChange={handleChangeCustomer}
                    value={selectedCustomer}
                  />
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
                  name="created_at"
                  defaultValue={defaultDate}
                  value={order}
                  style={{
                    color: "#343a40",
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
  );
};

AddModal.propTypes = {
  addProduct: PropTypes.func.isRequired,
  manualSale: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  manualSale: state.manualSale,
  checkUrl: state.checkUrl,
});

export default connect(mapStateToProps, {
  addProduct,
  getProducts,
})(AddModal);
