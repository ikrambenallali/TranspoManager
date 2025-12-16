import { describe, test, expect, jest, beforeEach } from "@jest/globals";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// 🔹 Mock User Model
await jest.unstable_mockModule("../Models/User.js", () => ({
  default: jest.fn().mockImplementation((data) => ({
    ...data,       // <-- prend les champs fullname, email, role
    save: jest.fn().mockResolvedValue(true)
  }))
}));


// 🔹 Mock utils et services
await jest.unstable_mockModule("../utils/passwordUtils.js", () => ({
    generatePassword: jest.fn(() => "mockPassword123")
}));

await jest.unstable_mockModule("../services/emailService.js", () => ({
    sendMail: jest.fn()
}));

const { default: User } = await import("../Models/User.js");
const { generatePassword } = await import("../utils/passwordUtils.js");
const { sendMail } = await import("../services/emailService.js");
const { createDriver, getAllUsers } = await import("../Controllers/userController.js");

// 🔹 Mock mongoose static methods
User.findOne = jest.fn();
User.find = jest.fn();

// 🔹 Mock response
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

beforeEach(() => {
    jest.clearAllMocks();
});

/* ================= CREATE DRIVER ================= */
describe("createDriver", () => {

    test("❌ email déjà existant", async () => {
        User.findOne.mockResolvedValue({ email: "test@example.com" });

        const req = { body: { fullname: "John", email: "test@example.com", role: "driver" } };
        const res = mockRes();

        await createDriver(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: "This email already exists." });
    });

    test("✅ création réussie", async () => {
        User.findOne.mockResolvedValue(null);
        bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
        jwt.sign = jest.fn().mockReturnValue("mockToken");
        sendMail.mockResolvedValue(true);

        const req = { body: { fullname: "John", email: "john@example.com", role: "driver" } };
        const res = mockRes();

        await createDriver(req, res);

        expect(generatePassword).toHaveBeenCalled();
        expect(bcrypt.hash).toHaveBeenCalledWith("mockPassword123", 10);
        expect(User).toHaveBeenCalled();
        expect(sendMail).toHaveBeenCalled();
        expect(jwt.sign).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                msg: "User registered successfully",
                token: "mockToken",
                user: expect.objectContaining({ fullname: "John", email: "john@example.com", role: "driver" })
            })
        );
    });
});

/* ================= GET ALL USERS ================= */
describe("getAllUsers", () => {

    test("✅ retourne tous les utilisateurs", async () => {
        const mockUsers = [{ _id: "1", fullname: "John" }, { _id: "2", fullname: "Jane" }];
        User.find.mockResolvedValue(mockUsers);

        const req = {};
        const res = mockRes();

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "All users", users: mockUsers });
    });

    test("❌ erreur serveur", async () => {
        User.find.mockRejectedValue(new Error("DB Error"));

        const req = {};
        const res = mockRes();

        await getAllUsers(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: "Server error" });
    });
});
