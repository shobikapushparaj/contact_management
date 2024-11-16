const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("Signup_details", UserSchema);

const ContactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true,unique:true },
  company: { type: String, required: true },
  jobTitle: { type: String, required: true }
});



const contactmodel = mongoose.model('Contact_details', ContactSchema);
module.exports={
  contactmodel:contactmodel,
  UserModel: UserModel,
};