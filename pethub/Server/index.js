const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  sql.connect(config, async (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds)
    const encryptPassword = await bcrypt.hash(password, salt);
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const hh = today.getHours();
    const ms = today.getMinutes();
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy} ${hh}:${ms}`;

    console.log(req.body);

    // const profilePicture = req.file.path;

    request.input("UserNameEntered", sql.VarChar, userName);
    request.input("EmailEntered", sql.VarChar, email);

    const userNameEmailQuery = "SELECT UserName, Email FROM Users WHERE Username = @UserNameEntered OR Email = @EmailEntered";
    let duplicateUserNameOrEmail = false;
    request.query(userNameEmailQuery, (err, result2) => {
      console.log(result2);
      if(result2.rowsAffected > 0)
      {
        duplicateUserNameOrEmail = true;
      }
      if(duplicateUserNameOrEmail == true)
      {
        if(result2.recordset[0].UserName == userName &&  result2.recordset[0].Email == email)
        {
          console.log("Username and Email are taken");
          res.status(400).send("Username and Email are taken");
        }
        else if(result2.rowsAffected > 1)
        {
          console.log("Username and Email are taken");
          res.status(400).send("Username and Email are taken");
        }
        else if(result2.recordset[0].UserName == userName)
        {
          console.log("Username is taken");
          res.status(400).send("Username is taken");
        }
        else if(result2.recordset[0].Email == email)
        {
          console.log("Email is taken");
          res.status(400).send("Email is taken");
        }




        console.log(err);
      }
      else
      {
        const query = `INSERT INTO Users (FirstName, LastName, Username, Email, Password, Phone, City, State, Zip, DateCreated) 
                VALUES ('${firstName}', '${lastName}','${userName}', '${email}', '${encryptPassword}','${phone}', '${city}', '${state}', '${zip}', '${today}')`;

        request.query(query, (err, result) => {
          if (err) {
            console.log(err);
            console.log("User sign up failed");
            res.status(400).send("User sign up failed");
          } else {
            console.log("User signed up successfully");
            res.status(200).send("User signed up successfully");
          }
        });
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

    request.input("UserNameEntered", sql.VarChar, userName);
    

    console.log(req.body);

    const query = "SELECT Password FROM Users WHERE Username = @UserNameEntered";

    request.query(query, async (err, result) => {
      console.log(result);

      if (err) {
        console.log(err);
        res.status(400).send("User sign up failed");
      }

      const hash = result.recordset[0].Password;
      const resultBool = await bcrypt.compare(password, hash);

      if (resultBool == true) {
        console.log("User logged in successfully");
        res.status(200).send("User logged in successfully");
        res.redirect("/");
      } else {
        console.log("Username or password is incorrect");
        res.status(401).send("Username or password is incorrect");
      }
    });
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
