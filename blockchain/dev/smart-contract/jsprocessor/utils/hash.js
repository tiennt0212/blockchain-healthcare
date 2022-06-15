const crypto = require("crypto");
const hash = (x) =>
  crypto
    .createHash("sha512")
    .update(x)
    .digest("hex")
    .toLowerCase()
    .substring(0, 64);

export { hash };
