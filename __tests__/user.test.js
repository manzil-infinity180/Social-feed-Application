const request = require("supertest");
const dotenv = require("dotenv");
const User = require('../model/userModel');
const Response = require("express");
const req = require("express");
const sendTokenCookies = require('../utils/sendTokenCookies');
dotenv.config({
  path: "__tests__/.env"
});
const jwt = require('jsonwebtoken')
const app = require("../app");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
// require("dotenv").config({path:});
let token;
// creating token using jwt 
const signToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET)
};
const verifyToken = (token) =>{
  return jwt.verify(token,process.env.JWT_SECRET);
}

// /* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_TEST);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

// testing the post 
// main create a profile
  describe("Create a user using mock  ", () => {
    test("Creating our first user ", async () => {
      const x = uuidv4();
      const user = {
        username: "rahul1237",
        bio: "i am 2nd year ug cse student 3 internship done",
        pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuO6vZOYpxSm05AKYVnO2CEnXosZmBtmWjaTjBxwTOrw&s"
    }
       const response = await request(app).post("/api/user/create").
       set('Content-Type', 'application/json').send(user);
       expect(response.statusCode).toBe(200);
       const id = response.body.output._id;
       const xt = await User.create({
        username:"rahulDemo",
       });
       console.log(xt);

       const checking = await User.findOne({username:user.username});
       if(checking){
          expect(checking.username).toBe(user.username);
       }else{
        expect(checking.username).not.toBe(user.username);
       }
       
       const xp = await User.create({username:"rahul1237"});
       console.log(xp)
       const userData = await User.findById(id,{_id:1,username:1,pic_url:1});
       expect(userData.username).toBe(user.username);
       token = signToken(userData._id);

       
    });
  });

  // login to a profile via username 
  describe("Login to a profile  ", () => {
    test("Login to the just above user (rahul1237) ", async () => {
      const x = uuidv4();
      const user = {
        username: "rahul1237",
    }
       const response = await request(app).post("/api/user/login").
       set('Content-Type', 'application/json').send({username : user.username});
       expect(response.statusCode).toBe(200);

       const {id} = verifyToken(token);
       expect(id).toBe(response.body.output._id);
    });
  });

  // update profile
  describe("Update a profile  ", () => {
    test("Updating username from rahul1237 to rahul1234 ", async () => {
      const x = uuidv4();
      try{
        const {id} = verifyToken(token);
        // const response = await request(app).patch("/api/user/update").
        // set('Content-Type', 'application/json').send({username : "rahul1234"});
        // const x = await User.findOne({username:"rahulDemo"});
        const response = await User.findByIdAndUpdate(id,{username: "rahul1234"});

        const responseData = await User.findById(id);
        expect(responseData.username).not.toBe("rahul1237")
        expect(responseData.username).toBe("rahul1234");
      }catch(err){
        console.log(err);
      }
    });
  });

  describe("Delete/seeing a Profile",()=>{
    test("Deleting the user with username rahul1234",async ()=>{
      const {id} = verifyToken(token);
      await User.findByIdAndDelete(id);

      const deletedUser = await User.findById(id);
      expect(deletedUser).toBeNull();
    });
  });
  describe("seeing a Profile",()=>{
    
    test("seeing other profile through the username",async ()=>{
      let response =await request(app).get(`/api/user/profile/rahul1234`).set('Content-Type', 'application/json');
      expect(response.statusCode).toBe(200);
      // expect(response.body.output.username).toBe("rahul1234");
      response = await request(app).get(`/api/user/profile/rahulDemo`).set('Content-Type', 'application/json');;
      expect(response.statusCode).toBe(200);
      // expect(response.body.output.username).not.toBe("rahulDemo");
    })
  });

  




  


