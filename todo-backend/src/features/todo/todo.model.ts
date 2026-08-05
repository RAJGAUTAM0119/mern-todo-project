import mongoose from "mongoose";

const { Schema, model } = mongoose

export enum priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

const todoSchema = new Schema({
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
    enum: priority,
    default: priority.MEDIUM
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

export const userTodo = model("Todo", todoSchema)