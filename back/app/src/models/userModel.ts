import mongoose, { Schema, Document } from "mongoose";

type Sex = "男" | "女";

interface User {
    first_name: string;
    last_name: string;
    email: string;
    age: Number;
    sex: Sex;
}

interface UserDoc extends Document {
    first_name: string;
    last_name: string;
    email: string;
    age: Number;
    sex: Sex;
}

interface UserModelInterface extends mongoose.Model<any> {
    build(attr: User): UserDoc;
}

const userSchema: Schema = new Schema(
    {
        first_name: {
            type: String,
            trim: true,
            required: true,
        },
        last_name: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
        },
        sex: {
            type: String,
            required: true,
            enum: ["男", "女"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<any, UserModelInterface>("User", userSchema);

userSchema.statics.build = (attr: User) => {
    return new User(attr);
};

userSchema.virtual("fullName").get(function (this: UserDoc) {
    return `${this.first_name} ${this.last_name}`;
});

export default User;
