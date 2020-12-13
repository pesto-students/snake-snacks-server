const router = require("express").Router();
const score = require("../models/Score");
const { scoreValidation } = require("../helpers/checkScoreValidity");

const { CheckTokenValidity } = require("../helpers/checkTokenValidity");

router.post("/add", async (req, res) => {
  const { _id } = CheckTokenValidity(req.headers.authorization);

  const { error } = scoreValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  if (_id) {
    const newScore = new score({
      userId: _id,
      score: req.body.score,
      mode: req.body.mode ? req.body.mode : "single",
    });
    try {
      const savedUser = await newScore.save();
      return res.json({ message: "saved successfully" });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else {
    res.status(401).json({ message: "unauthorized request" });
  }
});

module.exports = router;
