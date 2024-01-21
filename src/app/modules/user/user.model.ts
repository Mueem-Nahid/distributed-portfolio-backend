import { model, Schema } from 'mongoose';
import { IUser, USerModel } from './user.interface';

const educationSchema = new Schema({
  institutionName: {
    type: String,
    required: true,
  },
  institutionLink: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
});

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    email: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    education: {
      type: [educationSchema],
    },
    address: {
      type: String,
    },
    occupation: {
      type: {
        name: {
          type: String,
        },
        employerName: {
          type: String,
        },
        location: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, USerModel>('User', userSchema);
