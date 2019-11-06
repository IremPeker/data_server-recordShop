const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("data/db.json");
const db = low(adapter);

exports.getRecords = (req, res, next) => {
  // if there is nothing else to run after this function you dont have to define next

  const records = db.get("records").value();

  res.status(200).send(records);
};

exports.addRecord = (req, res, next) => {
  console.log(req.body);
  const record = req.body;
  db.get("records")
    .push(record)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(record);
};

// records/:id
exports.getRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get("records")
    .find({ id })
    .value(); // inside find({ id: id }) first id is the key, second id is the value that comes from const { id } = req.params;... So if the name of the key and the name of the parameter is the same, you can use one of them like find({ id })

  res.status(200).send(record);
};

exports.deleteRecord = (req, res, next) => {
  const { id } = req.params;
  const record = db
    .get("records")
    .remove({ id })
    .write();
  res.status(200).send(record);
};

exports.updateRecord = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const record = db
    .get("records")
    .find({ id })
    .assign(data)
    .write();
  res.status(200).send(record);
};

// make get delete and post delete on postman
