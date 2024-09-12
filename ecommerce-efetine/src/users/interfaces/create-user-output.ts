import { IUser } from './user.interface';

export type UserOutput = Omit<IUser, 'password' | 'address'>;
