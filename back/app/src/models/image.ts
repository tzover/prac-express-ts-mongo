import mongoose, { Schema, Document } from "mongoose";

interface IImage {
    folder_path: string;
    image_name: string;
}

interface IImageDoc extends Document {
    folder_path: string;
    image_name: string;
}

interface ImageModelInterface extends mongoose.Model<any> {
    build(attr: IImage): IImageDoc;
}

const ImageSchema: Schema = new Schema(
    {
        folder_path: {
            type: String,
            required: true,
        },
        image_name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model<any, ImageModelInterface>("Image", ImageSchema);

ImageSchema.statics.build = (attr: IImage) => {
    return new Image(attr);
};

export default Image;
