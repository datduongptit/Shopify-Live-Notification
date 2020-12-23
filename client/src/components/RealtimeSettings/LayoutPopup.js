import React, { useState, useCallback, useEffect } from "react";
import {
  TextStyle,
  Layout,
  RadioButton,
  Select,
  Button,
  Card,
} from "@shopify/polaris";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addRealtimeSetting, getRealtimeSetting } from "../../actions/realtime";
import position_1 from "../../images/position_1.png";
import position_2 from "../../images/position_2.jpg";
import position_3 from "../../images/position_3.jpg";
import position_4 from "../../images/position_4.jpg";
import Spinner from "../contents/Spinner";

const LayoutPopup = ({
  addRealtimeSetting,
  getRealtimeSetting,
  realtime: { loading },
  realtimeSetting,
  shop,
}) => {
  useEffect(() => {
    getRealtimeSetting(shop);
  }, [getRealtimeSetting, loading, shop]);

  const [checked, setChecked] = useState(realtimeSetting.layOut);
  const handleChange = useCallback(
    (_checked, newValue) => setChecked(newValue),
    []
  );
  const options = [
    { label: "Correct views", value: "Correct views" },
    { label: "Random views", value: "Random views" },
  ];

  const [positionValue, setPosition] = useState(
    JSON.stringify(realtimeSetting.style)
  );

  const handleChangePosition = useCallback(
    (_checked, newValue) => setPosition(newValue),
    []
  );

  const [orderChecked, setOrderChecked] = useState(realtimeSetting.status);

  const [selected, setSelected] = useState("Correct views");
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const [colorLeft, setColorLeft] = useState(realtimeSetting.bg_left);
  const onChangeColorLeft = (e) => {
    setColorLeft(([e.target.name] = e.target.value));
  };

  const [colorRight, setColorRight] = useState(realtimeSetting.bg_right);
  const onChangeColorRight = (e) => {
    setColorRight(([e.target.name] = e.target.value));
  };

  const [color, setColor] = useState(realtimeSetting.bg_popup);
  const onChangeColor = (e) => {
    setColor(([e.target.name] = e.target.value));
  };

  const [colorText, setColorText] = useState(realtimeSetting.colorText);
  const onChangeColorText = (e) => {
    setColorText(([e.target.name] = e.target.value));
  };

  const [customText, setCustomText] = useState(realtimeSetting.text_display);
  const onChangeText = (e) => {
    setCustomText(([e.target.name] = e.target.value));
  };

  const [loadingButton, setLoading] = useState(false);

  const initialState = {
    status: "0",
    bg_left: "red",
    bg_right: "green",
    bg_popup: "#000",
    max: "0",
    min: "0",
    text_display: "Testing",
    colorText: "#ccc",
    position: "topLeft",
    layOut: "gradient",
  };
  const [formData, setFormData] = useState(initialState);
  formData.status = orderChecked === true ? "1" : "0";
  formData.style = positionValue;
  formData.bg_left = colorLeft;
  formData.bg_right = colorRight;
  formData.bg_popup = color;
  formData.colorText = colorText;
  formData.layOut = checked;
  formData.text_display = customText;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log(formData.style);
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      await addRealtimeSetting(formData, shop);
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <Card sectioned>
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">
                    Show Order Notifications
                  </TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <input
                    style={{ zoom: 1.4 }}
                    type="checkbox"
                    name="orderChecked"
                    value={Boolean(realtimeSetting.status)}
                    defaultChecked={orderChecked}
                    onChange={() => setOrderChecked(!Boolean(orderChecked))}
                  />
                </Layout.Section>
              </Layout>
            </div>
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Layout Popup</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <Card sectioned>
                    <div className="section-title">
                      <TextStyle variation="strong">
                        Background Gradient:
                      </TextStyle>
                    </div>
                    <Card sectioned>
                      <Layout.Section secondary>
                        <Layout.Section>
                          <div style={{ display: "flex" }}>
                            <RadioButton
                              checked={checked === "gradient"}
                              onChange={handleChange}
                              id="gradient"
                              name="checked"
                            />
                            <div
                              className="gradient"
                              style={{
                                background: `linear-gradient(90deg,${colorLeft}, ${colorRight})`,
                              }}
                            >
                              <i
                                style={{ color: "#fff" }}
                                className="fa fa-users"
                              ></i>
                              <span className="custom-text"> {customText}</span>
                            </div>
                          </div>
                        </Layout.Section>
                        <div className="mt-3 color-pick">
                          <div
                            style={{
                              paddingRight: "15px",
                              paddingBottom: "5px",
                            }}
                          >
                            <span style={{ fontWeight: 600, color: "#6c7d8d" }}>
                              Background left:{" "}
                            </span>
                            <input
                              type="color"
                              name="bg_left"
                              defaultValue={colorLeft}
                              className="color"
                              onChange={onChangeColorLeft}
                            />
                          </div>
                          <div>
                            <span style={{ fontWeight: 600, color: "#6c7d8d" }}>
                              Background right:{" "}
                            </span>

                            <input
                              type="color"
                              name="bg_right"
                              defaultValue={colorRight}
                              className="color"
                              onChange={onChangeColorRight}
                            />
                          </div>
                        </div>
                      </Layout.Section>
                    </Card>
                  </Card>
                  <Card sectioned>
                    <div className="section-title">
                      <TextStyle variation="strong">
                        Background Color:
                      </TextStyle>
                    </div>
                    <Card sectioned>
                      <Layout.Section secondary>
                        <Layout.Section>
                          <div style={{ display: "flex" }}>
                            <RadioButton
                              checked={checked === "bg_popup"}
                              onChange={handleChange}
                              id="bg_popup"
                              name="checked"
                            />
                            <div
                              className="gradient"
                              style={{ backgroundColor: color }}
                            >
                              <i
                                style={{ color: colorText }}
                                className="fa fa-eye"
                              ></i>
                              <span
                                style={{ color: colorText }}
                                className="custom-text"
                              >
                                {" "}
                                {customText}
                              </span>
                            </div>
                          </div>
                        </Layout.Section>
                        <div className="mt-3">
                          <span style={{ fontWeight: 600, color: "#6c7d8d" }}>
                            Background Color:{" "}
                          </span>
                          <input
                            type="color"
                            name="bg_popup"
                            defaultValue={color}
                            className="color"
                            onChange={onChangeColor}
                          />
                        </div>
                      </Layout.Section>
                    </Card>
                  </Card>
                </Layout.Section>
              </Layout>
            </div>
          </Card>
          <Card sectioned>
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Select Date Format</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <div className="input-md mb-3">
                    <Select
                      options={options}
                      onChange={handleSelectChange}
                      value={selected}
                    />
                  </div>
                  {Number(realtimeSetting.min) !== 0 ||
                  selected === "Random views" ? (
                    <div className="mb-3">
                      <div className="mb-3 ml-5">
                        <span style={{ marginRight: 100, fontWeight: 600 }}>
                          Min
                        </span>
                        <input
                          type="number"
                          name="min"
                          defaultValue={
                            formData.min === ""
                              ? (formData.min = "0")
                              : realtimeSetting.min
                          }
                          onChange={onChange}
                          className="input-ssm"
                        />
                      </div>
                      <div className="mb-3 ml-5">
                        <span style={{ marginRight: 100, fontWeight: 600 }}>
                          Max
                        </span>
                        <input
                          type="number"
                          name="max"
                          defaultValue={
                            formData === "" ? "0" : realtimeSetting.max
                          }
                          onChange={onChange}
                          className="input-ssm"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Layout.Section>
              </Layout>
            </div>
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Custom Text</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <input
                    required
                    className="input-form"
                    name="customText"
                    defaultValue={customText}
                    onChange={onChangeText}
                  />
                </Layout.Section>
              </Layout>
            </div>
            <div className="mb-3 mt-5" style={{ marginTop: "26px" }}>
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Color Text</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <input
                    defaultValue={colorText}
                    name="colorText"
                    onChange={onChangeColorText}
                    type="color"
                    className="color"
                  />
                </Layout.Section>
              </Layout>
            </div>
            {/* Position */}
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary>
                  <TextStyle variation="strong">Position</TextStyle>
                </Layout.Section>
                <Layout.Section>
                  <ul className="img-list">
                    <li className="img-sm">
                      <label htmlFor="1">
                        <img alt="Nothing" className="img" src={position_4} />
                      </label>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <RadioButton
                          checked={positionValue === "1"}
                          id="1"
                          name="position"
                          onChange={handleChangePosition}
                        />
                      </div>
                    </li>
                    <li className="img-sm">
                      <label htmlFor="2">
                        <img alt="Nothing" className="img" src={position_1} />
                      </label>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <RadioButton
                          checked={positionValue === "2"}
                          id="2"
                          name="position"
                          onChange={handleChangePosition}
                        />
                      </div>
                    </li>
                    <li className="img-sm">
                      <label htmlFor="3">
                        <img alt="Nothing" className="img" src={position_3} />
                      </label>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <RadioButton
                          checked={positionValue === "3"}
                          id="3"
                          name="position"
                          onChange={handleChangePosition}
                        />
                      </div>
                    </li>
                    <li className="img-sm">
                      <label htmlFor="4">
                        <img alt="Nothing" className="img" src={position_2} />
                      </label>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <RadioButton
                          checked={positionValue === "4"}
                          id="4"
                          name="position"
                          onChange={handleChangePosition}
                        />
                      </div>
                    </li>
                  </ul>
                </Layout.Section>
              </Layout>
            </div>
          </Card>
          <div style={{ marginTop: "60px" }}>
            <Layout>
              <Layout.Section secondary></Layout.Section>
              <Layout.Section>
                <Button
                  size="large"
                  primary
                  submit={true}
                  loading={loadingButton}
                >
                  Save
                </Button>
                {/* <input type='submit' /> */}
              </Layout.Section>
            </Layout>
          </div>
        </form>
      )}
    </>
  );
};

LayoutPopup.propTypes = {
  addRealtimeSetting: PropTypes.func.isRequired,
  getRealtimeSetting: PropTypes.func.isRequired,
  realtime: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  realtime: state.realtime,
});

export default connect(mapStateToProps, {
  addRealtimeSetting,
  getRealtimeSetting,
})(LayoutPopup);
