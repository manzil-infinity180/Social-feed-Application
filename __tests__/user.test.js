const request = require("supertest");
const dotenv = require("dotenv");
const User = require('../model/userModel');
const sendTokenCookies = require('../utils/sendTokenCookies');
dotenv.config({
  path: "__tests__/.env"
});
const jwt = require('jsonwebtoken')
const app = require("../app");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
// require("dotenv").config({path:});

// /* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_TEST);
});

/* Closing database connection after each test. */
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('hello');
    //   console.log(response);
    });
  });
  jest.mock('jsonwebtoken', () => ({
    verify: jest.fn((token, secretOrPublicKey, options, callback) => {
      return callback(null, {sub: 'user_id'});
    })
  }));
  jest.mock("../utils/sendTokenCookies", () => jest.fn());

  describe("Create a user ", () => {
    test("Creating aur first user ", async () => {
      const x = uuidv4();
      const user = {
        username: "rahul1235",
        bio: "i am 2nd year ug cse student 3 internship done",
        pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuO6vZOYpxSm05AKYVnO2CEnXosZmBtmWjaTjBxwTOrw&s"
    }
    
       const response = await request(app).post("/api/user/create").send(user);
      //  console.log(response)
      
      //  console.log(jest.fn())
       expect(response.statusCode).toBe(200);

    
      
    //   expect(response.text).toBe('hello');
      // console.log(response);
    });
  });

  


