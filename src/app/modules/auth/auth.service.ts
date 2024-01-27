import {
  IChangePassword,
  ILoginUser,
  IRefreshTokenResponse,
  IUserLoginResponse,
} from './auth.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';

const loginUser = async (payload: ILoginUser): Promise<IUserLoginResponse> => {
  const { email, password } = payload;

  const user = new User();
  const isUserExist: Pick<IUser, 'email' | 'password'> | null =
    await user.isUserExist(email);
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');

  // match password
  if (!(await user.isPasswordMatched(password, isUserExist.password)))
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email or password is incorrect.'
    );

  // create access and refresh token
  const accessToken: string = jwtHelper.createToken(
    {
      email: isUserExist?.email,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expired_time }
  );

  const refreshToken: string = jwtHelper.createToken(
    {
      id: isUserExist?.email,
    },
    config.jwt.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt.jwt_refresh_token_expired_time }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const createRefreshToken = async (
  token: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (e) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token.');
  }
  const { email } = verifiedToken;

  const user = new User();
  const isUserExist = await user.isUserExist(email);
  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist.');

  const newAccessToken: string = jwtHelper.createToken(
    {
      id: isUserExist?.email,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expired_time }
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (
  payload: IChangePassword,
  userObj: JwtPayload | null
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.findOne({ email: userObj?.email }).select(
    '+password'
  );

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');

  // match password
  const user = new User();
  if (!(await user.isPasswordMatched(oldPassword, isUserExist.password)))
    throw new ApiError(httpStatus.UNAUTHORIZED, 'ID or password is incorrect.');

  isUserExist.password = newPassword;
  isUserExist.save();
};

export const AuthService = {
  loginUser,
  createRefreshToken,
  changePassword,
};
