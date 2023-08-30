const express = require("express");
const router = express.Router();

router.get("api/crsf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XRSF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-TOKEN": csrfToken,
  });
});

module.exports = router;
