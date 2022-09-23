const express = require("express");
const router = express.Router();

const shippo = require("shippo")(process.env.TEST_TOKEN);

router.get("/", (req, res) => {
  console.log("touching the shipping router");
  console.log(shippo);
});

//retrieve a shipment
router.get("/:shipment_id", async (req, res) => {
  try {
    const { shipment_id } = req.params;
    const shipmentFound = await shippo.shipment.retrieve(shipment_id);
    res.status(200).json(shipmentFound);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

//retrieve rates for shipment
router.get("/:shipment_id/rates", async (req, res) => {
  try {
    const { shipment_id } = req.params;
    const shipmentFound = await shippo.shipment.retrieve(shipment_id);
    res.status(200).json(shipmentFound.rates);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

//retrieve the sender & recipient address by shipment's object_id
router.get("/:shipment_id/addresses", async (req, res) => {
  try {
    const { shipment_id } = req.params;
    const shipmentFound = await shippo.shipment.retrieve(shipment_id);
    res.status(200).json({
      address_from: shipmentFound.address_from,
      address_to: shipmentFound.address_to,
    });
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

//retrieve parcel by passing a shipment's object_id
router.get("/:shipment_id/parcels", async (req, res) => {
  try {
    const { shipment_id } = req.params;
    const shipmentFound = await shippo.shipment.retrieve(shipment_id);
    res.status(200).json(shipmentFound.parcels);
  } catch (error) {
    res
      .status(error.status)
      .json({ error: error.message, detail: error.detail });
  }
});

//create a shipment
router.post("/", async (req, res) => {
  try {
    const {
      id,
      object_state,
      object_purpose,
      is_return,
      insurance_amount,
      address_from,
      address_to,
      parcels,
    } = req.body;
    const result = await shippo.shipment.create({
      id,
      object_state,
      object_purpose,
      is_return,
      insurance_amount,
      address_from,
      address_to,
      parcels,
    });

    res.status(201).json(result);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ error: error.message, detail: error.detail });
    console.log({ error });
  }
});

module.exports = router;
