const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const cryptoObj = require("../config/crypto");

//register doctor
module.exports.register = async function (req, res) {
  //Check all fields present or not
  if (
    req.body.email == undefined ||
    req.body.name == undefined ||
    req.body.password == undefined
  ) {
    return res.status(206).json({
      message: "Insufficient data",
    });
  }

  //if the doctor is already registered
  let reqEmail = req.body.email;
  let doctorExists = await Doctor.findOne({ email: reqEmail });
  if (doctorExists) {
    doctorExists = await doctorExists.toObject();
    delete doctorExists.password;
    return res.status(405).json({
      data: {
        doctor: doctorExists,
      },
      message: "Doctor is registered with email id provided",
    });
  }

  //Encryption doctor's password
  let password = req.body.password;
  let encrPass = cryptoObj.encrypt(password);
  req.body.password = encrPass;

  try {
    let createdDoctor = await (await Doctor.create(req.body)).toObject();
    delete createdDoctor.password;
    if (createdDoctor) {
      return res.status(200).json({
        data: {
          doctor: createdDoctor,
        },
        message: "Successfully Registered Doctor",
      });
    } else {
      return res.status(500).json({
        message: "Server error",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: `${err}`,
    });
  }
};

//login using jwt
module.exports.login = async function (req, res) {
  let id = req.body.id;
  if (req.body.id == undefined || req.body.password == undefined) {
    return res.status(206).json({
      message: "Insufficient data",
    });
  }
  try {
    let doctor = await Doctor.findById(id);

    if (doctor) {
      let pass = req.body.password;
      let pwdFromDb = doctor.password;
      pwdFromDb = cryptoObj.decrypt(pwdFromDb);

      if (pass == pwdFromDb) {
        return res.status(200).json({
          data: {
            token: jwt.sign(doctor.toJSON(), "hospital", {
              expiresIn: 1000000,
            }),
          },
          message: "Here is your token",
        });
      }
    }
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `${err}`,
    });
  }
};
