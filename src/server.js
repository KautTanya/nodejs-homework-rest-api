const mongoose = require("mongoose");
require("dotenv").config();
const app = require('./app');

mongoose.set('strictQuery', false);

const { HOST_URL, PORT = 3000 } = process.env;

 mongoose
  .connect(HOST_URL)
  .then(() => 
    app.listen(PORT, () =>
    console.log("Database connection successful.")
)
)
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
   