const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getUsers = (req, res, next) => {
  // if there is nothing else to run after this function you dont have to define next

  const users = db.get("users").value();

  res.status(200).send(users);
};

exports.addUser = (req, res, next) => {
  console.log(req.body);
  const user = req.body;
  db.get("users")
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(user);
};

// users/:id
exports.getUser = (req, res, next) => {
  const { id } = req.params; // req.params contains route parameters like /orders, /records,/users (in the path portion of the URL)
  const record = db
    .get("users")
    .find({ id })
    .value(); // inside find({ id: id }) first id is the key, second id is the value that comes from const { id } = req.params;... So if the name of the key and the name of the parameter is the same, you can use one of them like find({ id })

  res.status(200).send(record);
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get("users")
    .remove({ id })
    .write();
  res.status(200).send(record);
};

exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const record = db
    .get("users")
    .find({ id })
    .assign(data)
    .write();
  res.status(200).send(record);
};
