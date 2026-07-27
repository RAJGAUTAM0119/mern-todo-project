import { Types } from 'mongoose'

export interface IToken {
  email: string,
  role: string,
  userId: Types.ObjectId
}