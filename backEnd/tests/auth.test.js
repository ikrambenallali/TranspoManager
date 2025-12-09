// import request from "supertest";
// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import bcrypt from "bcryptjs";
// import app from "../index.js";
// import User from "../Models/User.js";

// let mongoServer;

// beforeAll(async () => {
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();
//   await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// });

// afterEach(async () => {
//   await User.deleteMany();
// });

// describe("Auth API", () => {

//   it("should login successfully with correct credentials", async () => {
//     const password = await bcrypt.hash("password123", 10);
//     const user = await User.create({
//       fullname: "Alice",
//       email: "alice@example.com",
//       password,
//       role: "user"
//     });

//     const res = await request(app)
//       .post("/auth/login")
//       .send({ email: "alice@example.com", password: "password123" });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.token).toBeDefined();
//     expect(res.body.user.email).toBe("alice@example.com");
//   });

//   it("should fail login with incorrect password", async () => {
//     const password = await bcrypt.hash("password123", 10);
//     await User.create({ fullname: "Bob", email: "bob@example.com", password, role: "user" });

//     const res = await request(app)
//       .post("/auth/login")
//       .send({ email: "bob@example.com", password: "wrongpassword" });

//     expect(res.statusCode).toBe(400);
//     expect(res.body.msg).toBe("Invalid password");
//   });

//   it("should fail login with non-existing user", async () => {
//     const res = await request(app)
//       .post("/auth/login")
//       .send({ email: "nonexist@example.com", password: "password123" });

//     expect(res.statusCode).toBe(404);
//     expect(res.body.msg).toBe("User not found.");
//   });

//   it("should logout successfully", async () => {
//     const res = await request(app).post("/auth/logout");
//     expect(res.statusCode).toBe(200);
//     expect(res.body.message).toBe("Logout successful");
//   });

// });
