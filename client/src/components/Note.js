import React, { useState } from "react";
import { Banner } from "@shopify/polaris";
const Note = () => {
  const [state, setState] = useState(true);
  return (
    <>
      {state ? (
        <Banner status="warning" onDismiss={() => setState(!state)}>
          <p style={{ marginBottom: 0 }}>
            <span className="note-bold">NOTE: </span>
            <span>
              You must configure the application before use, please refer to how
              to configure
            </span>{" "}
            {""}
            <span>
              <a
                style={{ color: "#337ab7", textDecoration: "none" }}
                href="https://apps.omegatheme.com/live-sale-notification/guide.html"
              >
                here
              </a>
            </span>
            <span> or contact us </span>{" "}
            <span>
              <a
                style={{ color: "#337ab7", textDecoration: "none" }}
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                contact@omegatheme.com
              </a>
            </span>
            <span> to get help for free!</span>
          </p>
        </Banner>
      ) : (
        ""
      )}
    </>
  );
};

export default Note;
