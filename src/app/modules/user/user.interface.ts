import { Model } from 'mongoose';

export type IUser = {
  name: string;
  password: string;
  email: string;
  about: string;
  education: Array<{
    institutionName: string;
    institutionLink?: string;
    year: string;
    address?: string;
  }>;
  address?: string;
  occupation?: {
    name: string;
    employerName: string;
    location: string;
  };
};

// static methods
/* eslint-disable no-unused-vars */
export type IUserMethods = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'> | null>;
  isPasswordMatched(
    enteredPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
