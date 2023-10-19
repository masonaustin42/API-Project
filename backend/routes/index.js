const express = require("express");
const router = express.Router();

const apiRouter = require("./api");

router.use("/api", apiRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-TOKEN": csrfToken,
  });
});

// Serve React build files in production environment
if (process.env.NODE_ENV === "production") {
  const path = require("path");

  // Serve frontend's index.html at root route
  router.get("/", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });

  // Serve static assets in frontend's build folder
  router.use(express.static(path.resolve("../frontend/build")));

  // Serve frontend's index.html file at all other routes that do NOT start with /api
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.sendFile(
      path.resolve(__dirname, "../../frontend", "build", "index.html")
    );
  });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== "production") {
  router.get("/api/csrf/restore", (req, res) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return res.json({});
  });
}
module.exports = router;
