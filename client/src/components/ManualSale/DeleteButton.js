import React, { useState, useCallback } from "react";
import { Modal, Button } from "@shopify/polaris";
import { deleteProduct } from "../../actions/manualSale";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const DeleteButton = ({ shop, id, deleteProduct }) => {
  const [active, setActive] = useState(false);
  const onChange = useCallback(() => setActive(!active), [active]);
  const activator = (
    <div className="btn-del" style={{ color: "#bf0711" }}>
      <Button onClick={onChange} size="medium">
        <span className="del-icon">
          <i className="far fa-trash-alt"></i>
        </span>
      </Button>
    </div>
  );
  return (
    <div>
      <Modal
        activator={activator}
        open={active}
        onClose={onChange}
        title="Are you sure want to delete this?"
        primaryAction={{
          content: "Delete",
          onAction: () => {
            deleteProduct(id, shop);
            setActive(!active);
          },
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: onChange,
          },
        ]}
      ></Modal>
    </div>
  );
};

DeleteButton.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
};

export default connect(null, { deleteProduct })(DeleteButton);
