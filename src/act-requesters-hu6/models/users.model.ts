import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: 'fixer' | 'requester' | 'visitor';
  language: 'es' | 'en';
  createdAt: Date;  
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter user name'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    passwordHash: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Password must be at least 6 characters']
    },

    role: {
      type: String,
      enum: ['fixer', 'requester', 'visitor'],
      default: 'visitor',
      required: true
    },

    language: {
      type: String,
      enum: ['es', 'en'],
      default: 'es',
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

export const User = mongoose.model<IUser>('User', UserSchema);
export default User;