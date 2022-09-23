const express = require("express");
const router = express.Router();

const shippo = require("shippo")(process.env.TEST_TOKEN);

router.get("/", async (req, res) => {
  try {
    const getAll = await shippo.address.list();
    res.status(200).json(getAll);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, company, street1, city, state, zip, country, phone, email } =
      req.body;
    const newAddress = await shippo.address.create({
      name,
      company,
      street1,
      city,
      state,
      zip,
      country,
      phone,
      email,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

module.exports = router;
