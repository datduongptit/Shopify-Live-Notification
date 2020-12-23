import React from "react";
import { Button, ButtonGroup } from "@shopify/polaris";

const Navbar = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: "100",
          borderBottom: "1px solid #ccc",
          width: "100%",
          backgroundColor: "#fff",
          padding: "12px 0px 12px 0px",
        }}
      >
        <div style={{ marginLeft: "10vh" }}>
          <ButtonGroup>
            <Button url="#">FAQs</Button>
            <Button
              external
              url="https://live-sale-notifications.myshopify.com/pages/document"
            >
              Document
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

export default Navbar;
