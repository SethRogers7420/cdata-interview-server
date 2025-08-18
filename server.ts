import express from "express";
import * as DB from "./db";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/login", async (req, res) => {
  const { username, password } = req.query;

  // Load the user from the database by their username.
  const user = await DB.getUser(username as string);
  if (user === null) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  if (user!.password !== password) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  res.json({ message: "Login successful", user: user });
});

app.get("/address-history", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  const allUsers = await DB.getAllUsers();

  for (const user of allUsers) {
    const addresses = await DB.getAddressHistoryForUser(user.username);
    if (user.username === username) {
      res.json({ addresses });
      return;
    }
  }
});

const port = process.env.PORT || 55555;

function errorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.error(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
