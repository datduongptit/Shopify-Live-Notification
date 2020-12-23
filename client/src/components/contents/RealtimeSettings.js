import React, { useEffect } from "react";
import LayoutPopup from "../RealtimeSettings/LayoutPopup";
import Alert from "../Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRealtimeSetting } from "../../actions/realtime";
import Spinner from "./Spinner";

const RealtimeSettings = ({
  getRealtimeSetting,
  realtime: { realtimeSetting, loading },
  checkUrl: { shop },
}) => {
  useEffect(() => {
    getRealtimeSetting(shop);
  }, [getRealtimeSetting, loading, shop]);
  return (
    <>
      {realtimeSetting == null ? (
        <Spinner />
      ) : (
        <div className="container">
          <Alert />
          {realtimeSetting.map((item, index) => (
            <LayoutPopup shop={shop} realtimeSetting={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

RealtimeSettings.propTypes = {
  getRealtimeSetting: PropTypes.func.isRequired,
  realtime: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  realtime: state.realtime,
  checkUrl: state.checkUrl,
});

export default connect(mapStateToProps, { getRealtimeSetting })(
  RealtimeSettings
);
