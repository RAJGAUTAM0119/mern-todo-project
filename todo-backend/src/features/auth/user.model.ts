import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
	name: string;
	email: string;
	password: string;
	role: "USER" | "ADMIN";
	isEmailVerified: boolean;
}

interface UserMethods {
	comparePassword(candidatePassword: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, UserMethods>;

const SALT_ROUNDS = 10;

export enum UserRole {
	USER = "USER",
	ADMIN = "ADMIN",
}

const userSchema = new Schema<IUser, UserModel, UserMethods>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
			minLength: 2,
			maxLength: 50,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minLength: 8,
			maxLength: 128,
			select: false,
		},
		role: {
			type: String,
			enum: Object.values(UserRole),
			default: UserRole.USER,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

userSchema.method(
	"comparePassword",
	async function (candidatePassword: string): Promise<boolean> {
		return await bcrypt.compare(candidatePassword, this.password);
	},
);

export const userModel = model<IUser, UserModel>("User", userSchema);
