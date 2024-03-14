const request = require("supertest");
const dotenv = require("dotenv");
const User = require('../model/userModel');
const axios = require('axios');
const { getMockReq, getMockRes } = require('@jest-mock/express');
// const httpMocks = require("node-mocks-http");
// const User = require('../model/userModel');
const {createPost,deletePost,updatePost,
        viewAllPost,viewPost} = require("../controller/postController");
const {createProfile,login} = require("../controller/userController");
const server ='http://localhost:5006';
let id;
jest.mock('../controller/userController');

dotenv.config({
  path: "__tests__/.env"
});

const app = require("../app");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_TEST);

});

/* Closing database connection after each test. */
afterAll(async () => {
 
  await mongoose.connection.close();
});


describe("View all post", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/api/post");
      expect(response.statusCode).toBe(200);
    });
  });

describe("create a user ",()=>{
  test("creating a user then posting something",async ()=>{
    try{
    const user = {
      username: "demoPost",
      bio: "Uploading from the post test",
      pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuO6vZOYpxSm05AKYVnO2CEnXosZmBtmWjaTjBxwTOrw&s"
  }
    const userResponse = await fetch(`${server}/api/user/create`,{
      method:'POST',
      body:JSON.stringify(user),
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    });
    expect(userResponse.statusCode).toBe(200);
    }catch(err){
      console.log(err);
    }
    //  expect(userResponse.statusCode).toBe(200);
   
  })
})
