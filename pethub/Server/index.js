const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
//   fileFilter: fileFilter,
// });

//SQL config

const config = {
  user: "SQL2019_1032169_pethub_user", // sql user
  password: "mega$Spring6556", //sql user password
  server: "sql2k1902.discountasp.net", // if it does not work try- localhost
  database: "SQL2019_1032169_pethub",
  options: {
    port: 1433,
    trustServerCertificate: true,
    encrypt: true,
    enableArithAbort: true,
  },
};

//Route to handle user sign-up
app.post("/signup", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    console.log(req.body);

    // const profilePicture = req.file.path;
    const query = `INSERT INTO Users (FirstName, LastName, Username, Email, Password, Phone, City, State, Zip) 
                VALUES ('${firstName}', '${lastName}','${userName}', '${email}', '${password}','${phone}', '${city}', '${state}', '${zip}')`;

    request.query(query, (err, result) => {
      if (err) {
        console.log(err);
        console.log("User sign up failed");
      } else {
        console.log("User signed up successfully");
        res.send("User signed up successfully");
      }
    });
  });
});

app.post("/login", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const userName = req.body.userName;
    const password = req.body.password;

    request.input("i1", sql.VarChar, userName);
    request.input("i2", sql.VarChar, password);

    console.log(req.body);

    const query =
      "SELECT * FROM Users WHERE Username = @i1 AND Password = @i2";

    request.query(query,(err, result) => {
      console.log(result);
      
      if (err) {
        console.log(err);
        res.send("User sign up failed");
      }
      if (result.rowsAffected > 0) {
        console.log("User logged in successfully");
        res.send("User logged in successfully");
      } 
    });
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
