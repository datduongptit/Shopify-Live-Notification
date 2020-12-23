const checkHmacValidity = require("shopify-hmac-validation").checkHmacValidity;
require("dotenv").config();

exports.verify = (query) => {
  var validate = checkHmacValidity({
    replacements: {
      both: {
        "&": "%26",
        "%": "%25",
      },
      keys: {
        "=": "%3D",
      },
    },
    excludedKeys: ["signature", "hmac"],
    algorithm: "sha256",
    format: "hex",
    digestKey: "hmac",
  });

  return validate(process.env.SHOPIFY_API_SECRET, null, query);
};
