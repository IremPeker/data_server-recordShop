const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Record = require('../models/Record');
const Order = require('../models/Order');

(async function() {
  /** CONNECT TO MONGO */
  mongoose.connect("mongodb://localhost:27017/live-coding-ds", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );

  mongoose.connection.on("open", () => {
    console.log(`Connected to the database...`);
  });

  console.log(`First, i will delete all the old users`);

/** DELETE ALL USERS */
  try {
    await User.deleteMany({});
    console.log('Old users moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL RECORDS */
  try {
    await Record.deleteMany({});
    console.log('Old records moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }

  /** DELETE ALL ORDERS */
  try {
    await Order.deleteMany({});
    console.log('Old orders moved to a better place. Spandau');
  } catch (e) {
    console.log(e);
  }


  console.log(`I am creating 20 fake users`);


//*CREATE 20 FAKE USERS*//
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthday: faker.date.past(),
        userName: faker.internet.userName(),
        address: {
          city: faker.address.city(),
          street: faker.address.streetName()
        }
      });

      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log('Users stored in the database!');
  } catch (e) {
    console.log(e);
  }


  console.log(`I am creating 20 fake records`);
  
//*CREATE 20 FAKE RECORDS*//
  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const record = new Record({
        title: faker.random.words(),
        artist: faker.internet.userName(),
        year: new Date(faker.date.past()).getFullYear(), // we changed it like that in order to see the year (not the miliseconds)
        price: faker.finance.amount()
      });

      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log('Records stored in the database!');
  } catch (e) {
    console.log(e);
  }

  mongoose.connection.close();
})();


// after running npm run seed on terminal, it will delete all the users first and then create 20 new users 

