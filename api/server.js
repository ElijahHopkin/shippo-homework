const express = require("express");
const cors = require("cors");

const ShipmentsRouter = require("./Shipments/ShipmentRouter");
const AddressRouter = require("./Addresses/addressRouter");
const ParcelRouter = require("./Parcel/ParcelRouter");

const server = express();
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.json("up and running");
});

server.use("/shipments", ShipmentsRouter);
server.use("/address", AddressRouter);
server.use("/parcel", ParcelRouter);

module.exports = server;
