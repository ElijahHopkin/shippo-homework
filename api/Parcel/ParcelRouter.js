express = require("express");
router = express.Router();

const shippo = require("shippo")(process.env.TEST_TOKEN);

router.get("/", (req, res) => {
  shippo.parcel
    .list()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(err.status).json({ error: err.message, detail: err.detail });
    });
});

router.post("/", async (req, res) => {
  try {
    const { length, width, height, distance_unit, weight, mass_unit } =
      req.body;
    const newParcel = await shippo.parcel.create({
      length,
      width,
      height,
      distance_unit,
      weight,
      mass_unit,
    });
    res.status(201).json(newParcel);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

module.exports = router;
