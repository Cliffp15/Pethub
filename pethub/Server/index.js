const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secretKey = "adjafhdohfodsahfaiaisjd";

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
    //const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptPassword = await bcrypt.hash(password, salt);
    //const phone = req.body.phone;
    //const city = req.body.city;
    //const state = req.body.state;
    //const zip = req.body.zip;
    //const securityQuestion = req.body.securityQuestion;
    //const securityAnswer = req.body.securityAnswer;
    //const encryptSecurityAnswer = await bcrypt.hash(securityAnswer, salt);
    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const hh = today.getHours();
    const ms = today.getMinutes();
    const yyyy = today.getFullYear();
    const todaysDate = `${mm}-${dd}-${yyyy} ${hh}:${ms}`;

    console.log(req.body);

    // const profilePicture = req.file.path;

    request.input("EmailEntered", sql.VarChar, email);

    const userNameEmailQuery =
      "SELECT Email FROM Users WHERE Email = @EmailEntered";
    let duplicateUserNameOrEmail = false;
    request.query(userNameEmailQuery, (err, result2) => {
      console.log(result2);
      if (result2.rowsAffected > 0) {
        duplicateUserNameOrEmail = true;
      }
      if (duplicateUserNameOrEmail === true) {
        if (result2.recordset[0].Email == email) {
          console.log("Email is taken");
          res.status(400).send("Email is taken");
        }

        console.log(err);
      } else {
        const query = `INSERT INTO Users (FirstName, LastName, Email, Password, DateCreated) 
                VALUES ('${firstName}', '${lastName}', '${email}', '${encryptPassword}', '${todaysDate}')`;

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

app.post("/signindialog", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const email = req.body.email;
    const password = req.body.password;

    request.input("EmailEntered", sql.VarChar, email);

    console.log(req.body);

    const query =
      "SELECT Password, ID FROM Users WHERE Email = @EmailEntered";

    request.query(query, async (err, result) => {
      console.log(result);

      if (err) {
        console.log(err);
        res.status(400).send("User sign up failed");
      }

      if (result.rowsAffected == 0) {
        console.log("Username or password is incorrect");
        res.status(401).send("Username or password is incorrect");
      } else {
        const hash = result.recordset[0].Password;
        const resultBool = await bcrypt.compare(password, hash);
        if (resultBool === true) {
          const userId = result.recordset[0].ID;
          const token = jwt.sign({ userId: userId }, secretKey);
          console.log("User logged in successfully");
          res
            .status(200)
            .send({ message: "User logged in successfully", token: token });
        } else {
          console.log("Username or password is incorrect");
          res.status(401).send("Username or password is incorrect");
        }
      }
    });
  });
});

app.post("/users", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const userId = req.body.userId;

    request.input("userIdRecieved", sql.VarChar, userId);

    // console.log(userId);

    const query = "SELECT * FROM Users WHERE ID = @userIdRecieved";

    // console.log(query);

    request.query(query, async (err, result) => {
      console.log(result);

      if (err) {
        console.log(err);
        res.status(400).send("Failed to find user");
      } else {
        const userName = result.recordset[0].UserName;
        const phone = result.recordset[0].Phone;
        const zip = result.recordset[0].Zip;
        const profilePicture = result.recordset[0].ProfilePicture;
        res.status(200).send({
          userName: userName,
          phone: phone,
          zip: zip,
          profilePicture: profilePicture,
        });
      }
    });
  });
});

app.post("/updateUser", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const userId = req.body.userId;
    const userName = req.body.userName;
    const photo = req.body.photo;
    const zip = req.body.zip;
    const phone = req.body.phone;

    console.log(req.body);

    const query = `UPDATE Users 
    SET UserName = '${userName}', ProfilePicture = '${photo}', Zip = '${zip}', Phone = '${phone}'
    WHERE ID = '${userId}'`;

    request.query(query, (err, result) => {
      if (err) {
        console.log(err);
        console.log("Account failed to update");
        res.send(err);
      } else {
        console.log("Account Updated Sucessfully");
        res.send("Account Updated Sucessfully");
      }
    });
  });
});

app.post("/postapet", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const images = req.body.image;
    const description = req.body.description;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const species = req.body.species;
    const breed = req.body.breed;
    const age = req.body.breed;
    const sex = req.body.sex;
    const petName = req.body.petName;
    const color = req.body.color;

    console.log(req.body);

    const query = `INSERT INTO Pets (Species, Name, Breed, Description, Sex, DefaultImage, Color ) 
                VALUES ('${species}', '${petName}','${breed}', '${description}','${sex}', '${images}','${color}')`;

    request.query(query, (err, result) => {
      if (err) {
        console.log(err);
        console.log("pet failed to post");
        res.send(err);
      } else {
        console.log("Pet posted succesfully");
        res.send("Pet posted succesfully");
      }
    });
  });
});

app.post("/resetpassword", (req, res) => {
  sql.connect(config, async (err) => {
    if (err) console.log(err);

    const request = new sql.Request();

    const emailAddress = req.body.emailAddress;
    const userName = req.body.userName;
    const securityQuestion = req.body.securityQuestion;
    const securityAnswer = req.body.securityAnswer;
    const newPassword = req.body.newPassword;
    const salt = await bcrypt.genSalt(saltRounds);
    const encryptNewPassword = await bcrypt.hash(newPassword, salt);

    request.input("UserNameEntered", sql.VarChar, userName);
    request.input("EmailEntered", sql.VarChar, emailAddress);

    const correctInfoQuery =
      "SELECT UserName, Email, SecurityQuestion, SecurityAnswer FROM Users WHERE Username = @UserNameEntered AND Email = @EmailEntered";

    request.query(correctInfoQuery, async (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
        res.status(400).send("Query failed");
      }
      if (result.rowsAffected == 0) {
        console.log("Username or email do not exist");
        res.status(400).send("Username or email do not exist");
      } else {
        const hash = result.recordset[0].SecurityAnswer;
        const resultBool = await bcrypt.compare(securityAnswer, hash);
        console.log(resultBool);
        if (result.recordset[0].Email != emailAddress) {
          console.log("Email is incorrect");
          res.status(400).send("Email is incorrect");
        } else if (result.recordset[0].UserName != userName) {
          console.log("Username is incorrect");
          res.status(400).send("Username is incorrect");
        } else if (result.recordset[0].SecurityQuestion != securityQuestion) {
          console.log("Security question is incorrect");
          res.status(400).send("Security question is incorrect");
        } else if (resultBool == false) {
          console.log("Security answer is incorrect");
          res.status(400).send("Security answer is incorrect");
        } else {
          const updateQuery = `UPDATE Users SET Password = '${encryptNewPassword}' WHERE Username = @UserNameEntered AND Email = @EmailEntered`;
          request.query(updateQuery, (err, result) => {
            if (err) {
              console.log(err);
              console.log("Update failed");
              res.status(400).send("Update failed");
            } else {
              console.log("New Password is created! Please sign in with it.");
              res
                .status(200)
                .send("New Password is created! Please sign in with it.");
            }
          });
        }
      }
    });
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server started on port ${port}`));
