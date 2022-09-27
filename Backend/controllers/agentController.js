const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const Agent = require("../model/agentModel");

// @desc    Register new agent
// @route   POST /api/agents
// @access  Public
const registerAgent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if Agent Exists
  const agentExists = await Agent.findOne({ email });

  if (agentExists) {
    res.status(400);
    throw new Error("Agent already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create agent
  const agent = await Agent.create({
    name,
    email,
    password: hashedPassword,
  });

  if (agent) {
    res.status(201).json({
      _id: agent.id,
      name: agent.name,
      email: agent.email,
      token: generateToken(agent._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid agent data");
  }
});

// @desc    Authenticate an agent
// @route   POST /api/agents/login
// @access  Public
const loginAgent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for agent email
  const agent = await Agent.findOne({ email });

  // Compare password using bcrypt
  let comparePassword;
  if (agent) {
    comparePassword = await bcrypt.compare(password, agent.password);
  }

  if (agent && comparePassword) {
    res.json({
      _id: agent.id,
      name: agent.name,
      email: agent.email,
      token: generateToken(agent._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get agent data
// @route   GET /api/agents/me
// @access  Private
const getAgent = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.agent;

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});

const getAllPackages = asyncHandler(async (req, res) => {
  const response = await Agent.find()
  .select('favorites');
  res.status(200).json(response);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerAgent, loginAgent, getAgent, getAllPackages };