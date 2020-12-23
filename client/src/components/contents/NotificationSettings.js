import React, { useEffect } from "react";
import NotificationSetting from "../Notification Settings/NotificationSetting";
import Alert from "../Alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotification } from "../../actions/notification";
import Spinner from "./Spinner";
const NotificationSettings = ({
  getNotification,
  notification: { notification, loading },
  checkUrl: { shop },
}) => {
  useEffect(() => {
    getNotification(shop);
  }, [getNotification, loading, shop]);

  return (
    <>
      {notification === null ? (
        <Spinner />
      ) : (
        <div className="container">
          <Alert />
          {notification.map((item, index) => (
            <NotificationSetting shop={shop} notification={item} key={index} />
          ))}
        </div>
      )}
    </>
  );
};

NotificationSettings.propTypes = {
  getNotification: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  notification: state.notification,
  checkUrl: state.checkUrl,
});

export default connect(mapStateToProps, { getNotification })(
  NotificationSettings
);
