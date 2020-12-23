import React, { useState } from "react";
import { Button, Icon } from "@shopify/polaris";
import { QuestionMarkMajor } from "@shopify/polaris-icons";

const Support = ({ required, ...props }) => {
  const [state, setState] = useState(false);
  return (
    <>
      <div>
        <div
          onClick={() => setState(!state)}
          style={{ display: `${state ? "none" : "flex"}` }}
        >
          <Button primary disclosure>
            <div style={{ display: "flex" }}>
              <Icon source={QuestionMarkMajor} />
              <span style={{ padding: "4px 0px 4px 3px" }}>Support</span>
            </div>
          </Button>
        </div>
        {state ? (
          <form
            className={
              state
                ? "support-form animate__animated animate__faster animate__fadeInUp"
                : "support-form animate__animated animate__faster animate__fadeOutDown"
            }
          >
            <div className="mb-3" style={{ width: "100%" }}>
              <div className="support-title">
                <span>Support</span>
                <span
                  onClick={() => setState(!state)}
                  style={{
                    float: "right",
                    marginRight: 6,
                    cursor: "pointer",
                  }}
                >
                  <i className="fa fa-minus"></i>
                </span>
              </div>
              <div style={{ padding: "16px" }}>
                <label
                  style={{ fontWeight: 600, margin: "16px 0", fontSize: 15 }}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  pattern="[^ @]*@[^ @]*"
                  required
                  id="email"
                  type="text"
                  className="support-input"
                  name="email"
                />
                {/* 
                <TextField
                  {...props}
                  label="Message*"
                  required
                  value={tagValue}
                  onChange={handleTagValueChange}
                  minLength={6}
                  showCharacterCount
                  multiline={3}
                /> */}
                <label
                  style={{
                    display: "inline-block",
                    maxWidth: "100%",
                    marginBottom: "5px",
                    fontWeight: 600,
                  }}
                  htmlFor="message"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  className="message-support"
                  type="text"
                  required
                  aria-labelledby="OmegaTextField10Label"
                  aria-invalid="false"
                  rows="3"
                ></textarea>
                <div style={{ float: "right", margin: "10px 0 16px 0" }}>
                  <Button primary size="medium" submit={true}>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Support;
