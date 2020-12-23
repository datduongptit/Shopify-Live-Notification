import React, { useState, useCallback, useEffect } from "react";
import Moment from "moment";
import logo from "../../images/demo-image.jpg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import position_1 from "../../images/position_1.png";
import position_2 from "../../images/position_2.jpg";
import position_3 from "../../images/position_3.jpg";
import position_4 from "../../images/position_4.jpg";
import {
  TextStyle,
  Layout,
  RadioButton,
  Select,
  OptionList,
  Checkbox,
  Button,
  TextField,
  Card,
} from "@shopify/polaris";
import {
  addNotification,
  getNotification,
  syncData,
} from "../../actions/notification";
import Spinner from "../contents/Spinner";
import { configDate } from "../configDate";

const NotificationSetting = ({
  addNotification,
  getNotification,
  notification,
  loading,
  syncData,
  shop,
}) => {
  useEffect(() => {
    getNotification(shop);
  }, [getNotification, shop]);
  const options = [
    { label: "Desktop device", value: "destop" },
    { label: "Mobile device", value: "mobile" },
    { label: "All device", value: "all" },
  ];
  // re-fomat date
  let today = new Date();
  let date = (format) => {
    return Moment(today).format(format);
  };

  const reConfigDate = (dateFomat) => {
    switch (dateFomat) {
      case "m/d/y":
        return date("MM/DD/YY");
      case "d/m/y":
        return date("DD/MM/YY");
      case "y/m/d":
        return date("YY/MM/DD");
      case "y.m.d":
        return date("YY.MM.DD");
      case "d.m.y":
        return date("DD.MM.YY");
      case "Y-m-d":
        return date("YYYY-MM-DD");
      case "d-m-y":
        return date("DD-MM-YY");
      case "d M, y":
        return date("DD MMM, YY");
      case "d M, Y":
        return date("DD MMM, YYYY");
      case "d F, y":
        return date("DD MMMM, YY");
      case "d F, Y":
        return date("DD MMMM, YYYY");
      case "l, d F, Y":
        return date("dddd, DD MMMM, YYYY");
      case "D, M d, Y":
        return date("ddd, MMM DD, YYYY");
      case "l, M d, Y":
        return date("dddd, MMM DD, YYYY");
      case "l, F d, Y":
        return date("dddd, MMMM DD, YYYY");
      case "D, F d, Y":
        return date("ddd, MMMM DD, YYYY");
      default:
        break;
    }
  };

  const optionTimes = configDate;
  const [choose, choosed] = useState(notification.DateTime);
  const handleOptionTimes = useCallback((value) => choosed(value), []);

  const optionsDate = [
    { label: "Disable", value: "disable" },
    { label: "Date time", value: "date" },
    { label: "Time ago", value: "hour" },
  ];
  const [selectedDate, setSelectedDate] = useState("date");
  const handleSelectChangeDate = useCallback(
    (value) => setSelectedDate(value),
    []
  );

  const optionsShow = [
    { label: "Random", value: "random" },
    { label: "Lastest", value: "lastest" },
  ];
  const [selectedShow, setSelectedShow] = useState("Random");
  const handleSelectChangeShow = useCallback(
    (value) => setSelectedShow(value),
    []
  );

  const optionsSelect = [
    { label: "Live Order", value: "live" },
    { label: "Fake Order", value: "fake" },
    { label: "All Order", value: "all" },
  ];
  const [selectedOrderSelect, setSelectOrderSelect] = useState(
    notification.type_order
  );
  const handleSelectOrder = useCallback(
    (value) => setSelectOrderSelect(value),
    []
  );

  const [positionValue, setPosition] = useState(
    JSON.stringify(notification.style)
  );
  const handleChangePosition = useCallback(
    (_checked, newValue) => setPosition(newValue),
    []
  );
  const [formDisplay, setFormDisplay] = useState(notification.effect_display);
  const display = formDisplay;

  const [formHide, setFormHide] = useState("fadeOutBig");
  const hidden = formHide;
  const [stateEffect, setStateEffect] = useState(false);
  const handleChange = useCallback(() => setStateEffect(!stateEffect), [
    stateEffect,
  ]);
  const [selected, setSelected] = useState(notification.show_device);
  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const [selectedOrder, setSelectedOrder] = useState(
    JSON.parse(notification.status)
  );
  // const [selectedOrder, setSelectedOrder] = useState(notification.status);

  const [checkedOrder, setCheckedOrder] = useState(
    notification.show_notifications
  );
  const handleChangeOrder = useCallback(
    (newChecked) => setCheckedOrder(newChecked),
    []
  );

  const [color, setColor] = useState(notification.colorHighlight);
  const onChangeColor = (e) => {
    setColor(([e.target.name] = e.target.value));
  };

  const [colorText, setColorText] = useState(notification.colorText);
  const onChangeColorText = (e) => {
    setColorText(([e.target.name] = e.target.value));
  };

  const [dateColor, setColorDate] = useState(notification.dateColor);
  const onChangeColorDate = (e) => {
    setColorDate(([e.target.name] = e.target.value));
  };

  const [borderRadius, setBorderRadius] = useState(notification.borderRadius);
  // const onChangeBorderRadius = (e) => {
  //   setBorderRadius(([e.target.name] = e.target.value));
  // };

  const onChange = (e) => {
    setFormDisplay(([e.target.name] = e.target.value));
  };
  const onChangeHide = (e) => {
    setFormHide(([e.target.name] = e.target.value));
  };

  const checkType = (input) => {
    return typeof input === "number" ? JSON.stringify(input) : input;
  };

  const [valueInput, setValue] = useState(checkType(notification.count));
  const handleChangeInput = useCallback((newValue) => setValue(newValue), []);
  const [displayTime, setTimeDisplay] = useState(
    checkType(notification.TimeDisplay)
  );
  const handleChangeTimeDisplay = useCallback(
    (newValue) => setTimeDisplay(newValue),
    []
  );
  const [timeLoop, setTimeLoop] = useState(checkType(notification.TimeLoop));
  const handleChangeTimeLoop = useCallback(
    (newValue) => setTimeLoop(newValue),
    []
  );
  const [borderValue, setBorderValue] = useState(
    checkType(notification.borderRadius)
  );
  const handleChangeBorder = useCallback(
    (newValue) => setBorderValue(newValue),
    []
  );
  const [textPopup, setTextPopup] = useState(notification.textPopup);
  const handleChangeTextPopup = useCallback(
    (newValue) => setTextPopup(newValue),
    []
  );

  const [loadingSubmit, setLoading] = useState(false);

  const [displayNotify, setDisplayNotify] = useState(false);
  const handleDisplayNotify = useCallback(
    () => setDisplayNotify(!displayNotify),
    [displayNotify]
  );

  const initialState = {
    show_notifications: "",
    show_custom_order: "",
    count: "",
    type_order: "",
    status: "",
    TimeLoop: "",
    TimeDisplay: "",
    DateTime: "",
    show_device: "",
    textPopup: "",
    effect_display: "",
    effect_hidden: "",
    style: "",
    colorHighlight: "#000000",
    colorDate: "#000000",
    colorText: "#000000",
    typeDate: "",
    borderRadius: null,
  };

  const [formData, setFormData] = useState(initialState);
  formData.textPopup = textPopup;
  formData.borderRadius = borderValue;
  formData.TimeLoop = timeLoop;
  formData.count = valueInput;
  formData.TimeDisplay = displayTime;
  formData.style = positionValue;
  formData.show_notifications = checkedOrder === true ? "1" : "0";
  formData.show_custom_order = selectedShow;
  formData.type_order = selectedOrderSelect;
  formData.status = JSON.stringify(selectedOrder);
  formData.DateTime = choose;
  formData.show_device = selected;
  formData.effect_display = display;
  formData.effect_hidden = hidden;
  formData.colorHighlight = color;
  formData.colorText = colorText;
  formData.colorDate = dateColor;
  formData.typeDate = selectedDate;
  // const onChangeData = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(!loadingSubmit);
    setTimeout(async () => {
      await addNotification(formData, shop);
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-3 mb-3">
          <div
            style={{
              position: "fixed",
              top: "2vh",
              right: "6%",
              zIndex: "1000",
            }}
          >
            <Button
              primary
              onClick={() => {
                setStateEffect(true);
                handleDisplayNotify();
              }}
            >
              <span>
                <i className="fa fa-laptop"> </i>
              </span>{" "}
              PREVIEW
            </Button>
          </div>
          <form onSubmit={onSubmit}>
            <Card sectioned>
              <div className="section-title">
                <TextStyle variation="strong">General Setting</TextStyle>
              </div>
              <Card sectioned>
                {/* Show Order */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">
                        Show Order Notifications
                      </TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <Checkbox
                        checked={checkedOrder}
                        onChange={handleChangeOrder}
                      />
                    </Layout.Section>
                  </Layout>
                </div>
                {/* Select Order */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Select Order</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="input-md">
                        <Select
                          options={optionsSelect}
                          onChange={handleSelectOrder}
                          value={selectedOrderSelect}
                        />
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
                {/* Custom order */}
                <div className="mb-3">
                  <div className="mb-3">
                    <Layout>
                      <Layout.Section secondary>
                        <TextStyle variation="strong">
                          Show Custom Order
                        </TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                        <div className="input-md">
                          <Select
                            options={optionsShow}
                            onChange={handleSelectChangeShow}
                            value={selectedShow}
                          />
                        </div>
                      </Layout.Section>
                    </Layout>
                  </div>
                  {selectedShow === "Random" ? (
                    <div className="mb-3">
                      <Layout>
                        <Layout.Section secondary>
                          <TextStyle variation="strong">
                            Number of Live Order to show
                          </TextStyle>
                        </Layout.Section>
                        <Layout.Section>
                          <div className="input-sm">
                            <TextField
                              name="numberOfLive"
                              type="number"
                              value={valueInput}
                              min="0"
                              onChange={handleChangeInput}
                            />
                          </div>
                        </Layout.Section>
                      </Layout>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {/* Order Status */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Order status</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="option">
                        <OptionList
                          onChange={setSelectedOrder}
                          options={[
                            { value: "pending", label: "Pending" },
                            { value: "paid", label: "Paid" },
                            { value: "refunded", label: "Refunded" },
                          ]}
                          selected={selectedOrder}
                          allowMultiple
                        ></OptionList>
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
              </Card>
            </Card>
            <Card sectioned>
              <div className="section-title">
                <TextStyle variation="strong">Time Setting</TextStyle>
              </div>
              <Card sectioned>
                {/* Display time */}
                <div className="mb-3">
                  <div className="mb-3">
                    <Layout>
                      <Layout.Section secondary>
                        <TextStyle variation="strong">
                          Next time display
                        </TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                        <div className="time-display">
                          <TextField
                            type="number"
                            value={timeLoop}
                            min="0"
                            onChange={handleChangeTimeLoop}
                            suffix="seconds"
                          />
                        </div>
                      </Layout.Section>
                    </Layout>
                  </div>
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Display time</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="time-display">
                        <TextField
                          type="number"
                          value={displayTime}
                          min="0"
                          onChange={handleChangeTimeDisplay}
                          suffix="seconds"
                        />
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
                {/* Select Date */}
                <div className="mb-3">
                  <div className="mb-3">
                    <Layout>
                      <Layout.Section secondary>
                        <TextStyle variation="strong">
                          Select Date Format
                        </TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                        <div className="input-md">
                          <Select
                            options={optionsDate}
                            onChange={handleSelectChangeDate}
                            value={selectedDate}
                          />
                        </div>
                      </Layout.Section>
                    </Layout>
                  </div>
                  {selectedDate === "date" ? (
                    <div className="mb-3">
                      <Layout>
                        <Layout.Section secondary></Layout.Section>
                        <Layout.Section>
                          <TextStyle variation="strong">
                            Chose date format
                          </TextStyle>
                          <div className="input-md">
                            <Select
                              options={optionTimes}
                              onChange={handleOptionTimes}
                              value={choose}
                            />
                          </div>
                        </Layout.Section>
                      </Layout>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
            </Card>
            <Card sectioned>
              <div className="section-title">
                <TextStyle variation="strong">Display Options</TextStyle>
              </div>
              <Card sectioned>
                {/* Show device */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">
                        Select show device
                      </TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="input-md">
                        <Select
                          options={options}
                          onChange={handleSelectChange}
                          value={selected}
                        />
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
                {/* Custom Text */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Custom Text</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <TextField
                        value={textPopup}
                        onChange={handleChangeTextPopup}
                      />
                      <p className="note-text p-0">
                        If you want to show the customer's name, lets put
                        "%name" you in the text box. Do the same with the
                        customer's city. Or instead of show the customer's name
                        you can replace "%name" with "Someone". And "%city" it
                        works with city. Example: Someone in Ha Noi, Viet Nam
                        purchased
                      </p>
                    </Layout.Section>
                  </Layout>
                </div>
              </Card>
            </Card>
            <Card sectioned>
              <div className="section-title">
                <TextStyle variation="strong">Choose Animation</TextStyle>{" "}
              </div>
              <Card sectioned>
                {/* Effect */}
                <div className="mb-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">
                        Message display effect
                      </TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <div className="input-md">
                        <select
                          className="option-list"
                          name="display"
                          defaultValue={notification.effect_display}
                          // onClick={() => setDisplayNotify(true)}
                          onChange={onChange}
                          style={{
                            width: "250px",
                            height: "40px",
                            margin: 0,
                            padding: "5px",
                          }}
                        >
                          <optgroup label="Attention Seekers">
                            <option value="bounce">Bounce</option>
                            <option value="flash">Flash</option>
                            <option value="pulse">Pulse</option>
                            <option value="shakeX">ShakeX</option>
                            <option value="bounce out up">Bounce out up</option>
                            <option value="shakeY">ShakeY</option>
                            <option value="swing">Swing</option>
                            <option value="tada">tada</option>
                            <option value="jello">Jello</option>
                            <option value="backInDown">Back In Down</option>
                            <option value="heartBeat">Bounce out up</option>
                            <option value="bounceInLeft">Bounce in left</option>
                          </optgroup>
                        </select>
                      </div>
                    </Layout.Section>
                  </Layout>
                </div>
                <Layout>
                  <Layout.Section secondary>
                    <TextStyle variation="strong">
                      Message hidden effect
                    </TextStyle>
                  </Layout.Section>
                  <Layout.Section>
                    <select
                      className="option-list"
                      name="hidden"
                      defaultValue={notification.effect_hidden}
                      onClick={() => setDisplayNotify(false)}
                      onChange={onChangeHide}
                      style={{
                        width: "250px",
                        height: "40px",
                        margin: 0,
                        padding: "5px",
                      }}
                    >
                      <optgroup label="Bouncing Exit">
                        <option value="fadeOutBig">fadeOutBig</option>
                        <option value="bounceOut">Bounce Out</option>
                        <option value="bounceOutDown">bounceOutDown</option>
                        <option value="bounceOutLeft">bounceOutLeft</option>
                        <option value="bounceOutRight">bounceOutRight</option>
                        <option value="bounceOutUp">bounceOutUp</option>
                        <option value="fadeOut">fadeOut</option>
                        <option value="fadeOutLeftBig">fadeOutLeftBig</option>
                        <option value="fadeOutRightBig">fadeOutRightBig</option>
                        <option value="fadeOutUpBig">fadeOutUpBig</option>
                      </optgroup>
                    </select>
                  </Layout.Section>
                </Layout>
              </Card>
            </Card>
            <Card sectioned>
              {/* Position */}
              <div className="section-title">
                <TextStyle variation="strong">Display Setting</TextStyle>{" "}
              </div>
              <Card sectioned>
                <div className="mb-3 mt-3">
                  <Layout>
                    <Layout.Section secondary>
                      <TextStyle variation="strong">Position</TextStyle>
                    </Layout.Section>
                    <Layout.Section>
                      <ul className="img-list">
                        <li className="img-sm">
                          <label htmlFor="1">
                            <img
                              alt="Nothing"
                              className="img"
                              src={position_4}
                            />
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
                            <img
                              alt="Nothing"
                              className="img"
                              src={position_1}
                            />
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
                            <img
                              alt="Nothing"
                              className="img"
                              src={position_3}
                            />
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
                            <img
                              alt="Nothing"
                              className="img"
                              src={position_2}
                            />
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

                {/* Color picker */}
                <div className="mt-5 mb-3">
                  <div>
                    <div className="mt-3 mb-3">
                      <Layout>
                        <Layout.Section secondary>
                          <TextStyle variation="strong">
                            Color Setting
                          </TextStyle>
                        </Layout.Section>
                        <Layout.Section>
                          <div className="color-setting">
                            <TextStyle variation="strong">
                              Highlight color
                            </TextStyle>
                            <div className="color-input">
                              <input
                                className="inputColor"
                                name="color"
                                value={color}
                                onChange={onChangeColor}
                                type="color"
                              />
                            </div>
                            <TextStyle variation="strong">Text color</TextStyle>
                            <div className="color-input">
                              <input
                                className="inputColor"
                                name="colorText"
                                value={colorText}
                                onChange={onChangeColorText}
                                type="color"
                              />
                            </div>
                            <TextStyle variation="strong">Color Date</TextStyle>
                            <div className="color-input">
                              <input
                                className="inputColor"
                                name="colorDate"
                                value={dateColor}
                                onChange={onChangeColorDate}
                                type="color"
                              />
                            </div>
                          </div>
                        </Layout.Section>
                      </Layout>
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    <Layout>
                      <Layout.Section secondary>
                        <TextStyle variation="strong">Border Radius</TextStyle>
                      </Layout.Section>
                      <Layout.Section>
                        <div className="input-sm">
                          <TextField
                            type="number"
                            value={borderValue}
                            min="0"
                            onChange={handleChangeBorder}
                          />
                        </div>
                      </Layout.Section>
                    </Layout>
                  </div>
                </div>
              </Card>
            </Card>
            {/* Footer */}
            <div className="mb-3 mt-3">
              <Layout>
                <Layout.Section secondary></Layout.Section>
                <Layout.Section>
                  <Button
                    size="large"
                    primary
                    submit={true}
                    loading={loadingSubmit}
                  >
                    Save
                  </Button>
                </Layout.Section>
              </Layout>
            </div>
            <div>
              {stateEffect === true ? (
                <div
                  style={{
                    borderRadius: `${borderRadius}px`,
                    overflow: "hidden",
                    left:
                      positionValue === "2"
                        ? "10px"
                        : positionValue === "1"
                        ? "10px"
                        : "",
                    bottom:
                      positionValue === "2"
                        ? "4vh"
                        : positionValue === "1"
                        ? "75vh"
                        : positionValue === "4"
                        ? "4vh"
                        : "75vh",
                    right:
                      positionValue === "4"
                        ? "0"
                        : positionValue === "3"
                        ? "0"
                        : "",
                    animationFillMode: "backwards",
                  }}
                  id="show-demo"
                  className={`animate__animated ${
                    !displayNotify
                      ? `animate__${hidden}`
                      : `animate__${display}`
                  } notification`}
                >
                  <div style={{ padding: 0 }}>
                    <div xs="2" style={{ display: "flex" }}>
                      <div md="4" xs="4" style={{ width: "100px" }}>
                        <img className="img_demo" alt="nothing" src={logo} />
                      </div>
                      <div md="8" xs="8" style={{ padding: "0 15px" }}>
                        <a
                          onClick={() => {
                            handleDisplayNotify();
                            setTimeout(() => {
                              handleChange();
                            }, 1000);
                          }}
                          className="hide_demo"
                        >
                          <i
                            style={{ color: "#000" }}
                            className="fa fa-times-circle"
                          ></i>
                        </a>
                        <h5
                          style={{
                            color: `${color}`,
                            padding: "0 0 0px 12px",
                            fontSize: "14px",
                          }}
                        >
                          Omega in Ha Noi, Viet Nam purchased
                        </h5>
                        <h2
                          style={{
                            color: `${colorText}`,
                            padding: "0 0 0px 12px",
                            fontWeight: 500,
                            fontSize: "14px",
                          }}
                        >
                          Lorem ipsum dolor
                        </h2>
                        <p
                          style={{
                            color: `${dateColor}`,
                            padding: "0 0 0px 12px",
                            fontSize: "12px",
                          }}
                        >
                          {selectedDate === "disable"
                            ? ""
                            : selectedDate === "hour"
                            ? "4 hour ago"
                            : `Date: ${reConfigDate(choose)}`}
                          {/* Date: {choose} */}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </form>
        </div>
      )}
    </>
  );
};

NotificationSetting.propTypes = {
  getNotification: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  syncData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.notification.loading,
});

export default connect(mapStateToProps, {
  addNotification,
  getNotification,
  syncData,
})(NotificationSetting);
