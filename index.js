const express = require("express");
const cors = require("cors");
const app = express();

let users = [];
//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// app.get("/home", function (req, res) {
//   res.json({ message: "success..." });
// });

// app.get("/about", function (req, res) {
//   res.json({ messgae: "About..." });
// });

app.post("/user", function (req, res) {
  req.body.id = users.length + 1;
  users.push(req.body);
  res.json({ message: "user created successfully..." });
});

app.get("/users", function (req, res) {
  let queryParams = req.query;

  let resUsers = [];
  for (
    let index = parseInt(req.query.offset);
    index < parseInt(req.query.offset) + parseInt(req.query.limit);
    index++
  ) {
    if (users[index]) {
      resUsers.push(users[index]);
    }
  }

  res.json(resUsers);
});

app.get("/user/:id", function (req, res) {
  // console.log(req.params.id)
  let userId = req.params.id;
  let data = users.find((item) => item.id == userId);
  // console.log(data)
  if (data) {
    res.json(data);
  } else {
    res.json("user not found");
  }
});

//for edit
app.put("/user/:id", function (req, res) {
  let userId = req.params.id;
  let userIndex = users.findIndex((item) => item.id == userId);

  if (userIndex !== -1) {
    Object.keys(req.body).forEach((item) => {
      users[userIndex][item] = req.body[item];
    });
    res.json({
      message: "user updated successfully",
    });
  } else {
    res.json({
      message: "user not found ",
    });
  }
});

app.delete("/user/:id", function (req, res) {
  let userId = req.params.id;
  let userIndex = users.findIndex((item) => {
    return item.id == userId;
  });
  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    res.json({
      message: "user deleted",
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
});

app.listen(3000);
