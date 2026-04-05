import dotenv from "dotenv";
import { User } from "../../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const jwtExpirySeconds = Number(process.env.JWT_EXPIRY);

export const userResolvers = {
    Query: {
        users: async () => {
            return await User.find().sort({createdAt: -1})
        },

        //checks if current user is logged in using jwt key 
        me: async (_, __, context) => {
            const token = context.req.cookies.token;

            if (!token) return null;

            try {
                const payload = jwt.verify(token, JWT_SECRET);
                return await User.findById(payload._id);
            } catch {
                return null;
            }
        }
    },

    Mutation: {
        registerUser: async(_, args) =>
        {
            const existingUser = await User.findOne({username: args.username})

            if (existingUser)
            {
                throw new Error("User already exists");
            }

            const newUser = new User({...args,});
            return newUser.save();
        },

        loginUser: async(_, args, context) =>
        {
            const user = await User.findOne({username: args.username});

            if (!user)
            {
                throw new Error("User not found");
            }
            
            const isValid = await bcrypt.compare(args.password, user.password);

            if (!isValid)
            {
                throw new Error("Invalid Login Credentials")
            }

            const token = jwt.sign(
                {_id: user._id, username: user.username},
                JWT_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: jwtExpirySeconds
                }
            );

            context.res.cookie("token", token, {
                maxAge: jwtExpirySeconds * 1000,
                httpOnly: true
            });

            return user;
        },

        logoutUser: async(_, __, context) =>
        {
          context.res.clearCookie("token");
          return "Logged out"
        }
    }
}