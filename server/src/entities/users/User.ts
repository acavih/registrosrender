import mongoose, { Document } from 'mongoose'

export interface IUser { user: string, password: string }

export interface IUserDocument extends IUser, Document { }

const userSchema = new mongoose.Schema({
  user: { type: String },
  password: { type: String }
})

export const User = mongoose.model('user', userSchema)

export default User
