const UserModel = require("../Model/User");
const asyncHandler = require("express-async-handler");
const generateToken =  require("../config/token.js");
const ValidateID = require("../utils/IDVerify")

//-------------------// Register New User //---------------------------

const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  //--------- check if user is already registered -------------
  const userExist = await UserModel.findOne({ email: email });

  if (userExist) throw new Error("User already exists!");

  try {
    const user = await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

//-------------------// Login User //---------------------------

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ Error: "Fill the data " });
  }

  //Check if user is exist
  const userFound = await UserModel.findOne({ email: email });

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePicture: userFound?.profilePicture,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error(`Invalid Details !!`);
  }
});

//-------------------// Fetch All User //---------------------------

const fetchUsers = asyncHandler(async (req, res) =>{
  try {
    const users = await UserModel.find({})
    res.json(users)
  } catch (error) {
    res.json(error)
  }
} )

//-------------------// Delete User //---------------------------

const deleteUser = asyncHandler(async (req, res) =>{

  const {id} = req.params;

  //checking user id is valid or not
  ValidateID(id)

  try {
    const deletedUser = await UserModel.findByIdAndDelete(id)
    res.json("User Delete Successfully")
  } catch (error) {
    res.json(error)
  }
} )



module.exports = { userRegister, LoginUser , fetchUsers , deleteUser };
