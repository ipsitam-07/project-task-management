import bcrypt from 'bcrypt';
import { User } from '../models/user.model';

export const registerUser = async (name: string, email: string, password: string) => {
  //checking if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('User already exists with email');
  }

  //hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  //new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};
