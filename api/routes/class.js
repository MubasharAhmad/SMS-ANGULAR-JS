const express = require("express");
const router = express.Router();

const Class = require("../models/User");
const fetchuser = require("../middleware/fetchuser");