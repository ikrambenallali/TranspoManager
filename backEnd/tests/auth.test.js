import { jest } from "@jest/globals";

// variables d'env
process.env.JWT_SECRET = "testsecret";

// ===== MOCKS (ESM) =====
await jest.unstable_mockModule("../Models/User.js", () => ({
  default: {
    findOne: jest.fn()
  }
}));

await jest.unstable_mockModule("bcryptjs", () => ({
  default: {
    compare: jest.fn()
  }
}));

await jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn()
  }
}));

// ===== IMPORTS APRÈS MOCKS =====
const { default: User } = await import("../Models/User.js");
const bcrypt = (await import("bcryptjs")).default;
const jwt = (await import("jsonwebtoken")).default;
const { login, logout } = await import("../controllers/authController.js");

// ===== UTILS =====
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// ===== TESTS =====
describe("Auth Controller - login", () => {
  test("should return 404 if user not found", async () => {
    User.findOne.mockResolvedValue(null);

    const req = {
      body: { email: "test@test.com", password: "123456" }
    };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "User not found." });
  });

  test("should return 400 if password is invalid", async () => {
    User.findOne.mockResolvedValue({ password: "hashed" });
    bcrypt.compare.mockResolvedValue(false);

    const req = {
      body: { email: "test@test.com", password: "wrong" }
    };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Invalid password" });
  });

  test("should login successfully", async () => {
    User.findOne.mockResolvedValue({
      _id: "123",
      fullname: "John Doe",
      email: "john@test.com",
      role: "admin",
      password: "hashed"
    });

    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("fake-token");

    const req = {
      body: { email: "john@test.com", password: "123456" }
    };
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: "User logged in successfully",
      token: "fake-token",
      user: {
        fullname: "John Doe",
        email: "john@test.com",
        role: "admin"
      }
    });
  });
});

describe("Auth Controller - logout", () => {
  test("should logout successfully", () => {
    const res = { json: jest.fn() };
    logout({}, res);

    expect(res.json).toHaveBeenCalledWith({ message: "Logout successful" });
  });
});
