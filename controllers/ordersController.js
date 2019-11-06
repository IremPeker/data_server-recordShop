const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getOrders = (req, res, next) => {
  // if there is nothing else to run after this function you dont have to define next

  const orders = db.get("orders").value();

  res.status(200).send(orders);
};

exports.addOrder = (req, res, next) => {
  const order = req.body;
  db.get("orders")
    .push(order)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(order);
};

// orders/:id
exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get("orders")
    .find({ id })
    .value(); // inside find({ id: id }) first id is the key, second id is the value that comes from const { id } = req.params;... So if the name of the key and the name of the parameter is the same, you can use one of them like find({ id })

  res.status(200).send(record);
};

exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get("orders")
    .remove({ id })
    .write();
  res.status(200).send(record);
};

exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const record = db
    .get("orders")
    .find({ id })
    .assign(data)
    .write();
  res.status(200).send(record);
};
