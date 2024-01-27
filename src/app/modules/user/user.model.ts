import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { hashPassword } from '../../../helpers/hashPassword';

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

export const userSchema = new Schema<
  IUser,
  Record<string, never>,
  IUserMethods
>(
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

// instance method
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  return User.findOne({ id }, { email: 1, password: 1 }).lean();
};

userSchema.methods.isPasswordMatched = async function (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> {
  return hashPassword.decryptPassword(enteredPassword, savedPassword);
};

// hash password using pre hook middleware (fat model thin controller)
// User.create() / user.save()
userSchema.pre('save', async function (next) {
  this.password = await hashPassword.encryptPassword(this.password);
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
