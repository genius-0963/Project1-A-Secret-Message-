import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
    content: string;
    contentAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    contentAt: {
        type: Date,
        default: Date.now,
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password should be at least 8 characters"],
        select: false,
    },
    verifyCode: {
        type: String,
        trim: true,
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true,
    },
    messages: [messageSchema],
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default UserModel;
