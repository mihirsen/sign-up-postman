const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Secret key for JWT (in a real app, keep this secure and don't hardcode)
const JWT_SECRET = "your_jwt_secret_key";

// In-memory storage for users (for demonstration purposes)
const users = [];

// User registration endpoint
app.post("/register", (req, res) => {
  const { email, password, name } = req.body;
  const userId = uuidv4(); // Generate a unique ID for the user
  const user = { userId, email, password, name }; // Create a new user object
  users.push(user); // Store the user in the in-memory array
  res.json({ userId }); // Respond with the user ID
});

// User login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // User found, generate a JWT token
    const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token }); // Respond with the JWT token
  } else {
    // User not found or password incorrect
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
