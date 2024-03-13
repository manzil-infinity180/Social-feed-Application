const request = require("supertest");
const dotenv = require("dotenv");
const User = require('../model/userModel');
// const User = require('../model/userModel');
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