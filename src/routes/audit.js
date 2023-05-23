const router = require("express").Router();
const { pool } = require("../database/database").pool;

router.get("/", validatorMiddleware, async (req, res) => {
  try {
    const logs = await pool.query("SELECT * FROM logs");

    return res.status(200).json({ logs });
  } catch (err) {
    console.log(err.message);

    return res.status(500).send(err.message);
  }
});

// TODO Add more endpoints to handle filtering for audit-ui

module.exports = router;
