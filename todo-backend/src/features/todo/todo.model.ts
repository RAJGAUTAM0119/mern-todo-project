import mongoose, { Types } from "mongoose";
import { TodoPriority } from "./dto/todo-query.dto.ts";

const { Schema, model } = mongoose

interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: Date;
  userId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 100
  },
  description: {
    type: String,
    trim: true,
    minLength: 0,
    maxLength: 500,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  priority: {
    type: String,
    required: true,
    enum: TodoPriority,
    default: TodoPriority.MEDIUM
  },
  dueDate: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
})

export const todoModel = model("Todo", todoSchema)