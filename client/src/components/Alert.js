import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts, manualSale: { products } }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div
      style={{ textAlign: "center" }}
      key={alert.id}
      className={`alert alert-${alert.alertType} animate__animated animate__bounceInRight`}
    >
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
  manualSale: state.manualSale,
});

export default connect(mapStateToProps)(Alert);
