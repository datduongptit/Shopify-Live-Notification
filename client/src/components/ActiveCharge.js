import React from "react";
import { getCharge } from "../actions/checkCharge";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
const ActiveCharge = ({ shop, getCharge }) => {
  return (
    <div
      className="container"
      style={{
        padding: "30px 0",
        marginTop: "50px",
        border: "5px solid #ec342e",
        maxWidth: "600px",
        textAlign: "center",
      }}
    >
      <img
        src="https://cdn.shopify.com/s/files/applications/e03e0948951b94a7b424d1a55634d891_512x512.png"
        style={{ maxWidth: "150px" }}
      />
      <h1
        style={{
          fontSize: "30px",
          textTransform: "uppercase",
          marginTop: "30px",
          marginBottom: "16px",
        }}
      >
        Charge now, pay later
      </h1>
      <p>
        To proceed with the installation, click below to activate the app and
        approve the charge.
      </p>
      <a
        className="btn btn-primary"
        target="_blank"
        onClick={async () =>
          await axios.get(
            "/live-notification/api/charge-require/hung-test-install.myshopify.com"
          )
        }
      >
        Activate App
      </a>
    </div>
  );
};

ActiveCharge.propTypes = {
  getCharge: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checkCharge: state.checkCharge,
});

export default connect(mapStateToProps, { getCharge })(ActiveCharge);
