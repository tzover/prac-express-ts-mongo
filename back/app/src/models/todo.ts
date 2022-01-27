import mongoose from "mongoose";

interface ITodo {
    title: String;
    description: String;
}

interface todoModelInterface extends mongoose.Model<any> {
    build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
    title: String;
    description: String;
}

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

todoSchema.statics.build = (attr: ITodo) => {
    return new Todo(attr);
};

const Todo = mongoose.model<any, todoModelInterface>("Todo", todoSchema);

Todo.build({
    title: "some title",
    description: "some description",
});

export { Todo };
