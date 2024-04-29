import { Request, Response } from "express";
import { Collection, Db } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

export const getAllUsers = async (req: Request, res: Response, db: Db) => {
  try {
    const usersCollection: Collection = db.collection("users");

    const users = await usersCollection.find().toArray();

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error });
  }
};

export const removeUser = async (req: Request, res: Response, db: Db) => {
  try {
    const { username } = req.params;

    const usersCollection: Collection = db.collection("users");

    const result = await usersCollection.deleteOne({ username });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ message: "User removed successfully" });
    }
  } catch (error) {
    console.error("Error removing user:", error);

    res.status(500).json({ message: error });
  }
};
