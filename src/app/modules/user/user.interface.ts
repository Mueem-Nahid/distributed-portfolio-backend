import { InferSchemaType, Model } from 'mongoose';
import { userSchema } from './user.model';

export type IUser = InferSchemaType<typeof userSchema>;

export type USerModel = Model<IUser, Record<string, unknown>>;
