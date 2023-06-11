const router = require("express").Router();
const { pool } = require("../database/database");

router.get("/", async (req, res) => {
  try {
    const { user_id, app_name } = req.query;

    let logs = [];

    if (user_id && app_name) {
      logs = await pool.query(
        "SELECT * FROM logs WHERE user_id = $1 AND app_name = $2 ORDER BY timestamp DESC",
        [user_id, app_name]
      );
    } else if (user_id) {
      logs = await pool.query(
        "SELECT * FROM logs WHERE user_id = $1 ORDER BY timestamp DESC",
        [user_id]
      );
    } else if (app_name) {
      logs = await pool.query(
        "SELECT * FROM logs WHERE app_name = $1 ORDER BY timestamp DESC",
        [app_name]
      );
    } else {
      logs = await pool.query("SELECT * FROM logs ORDER BY timestamp DESC");
    }

    return res.status(200).json(logs.rows);
  } catch (err) {
    console.log(err.message);

    return res.status(500).send(err.message);
  }
});

module.exports = router;
