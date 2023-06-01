import jwt, { Secret } from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { readOneUserByEmail } from '../repositories/user/read';
import WrongPassword from '../exceptions/WrongPassword';
const expiresIn = '2h';

const generateAccessToken = async (uuid: string, secretKey: string) => {
  return jwt.sign({ username: uuid }, secretKey as Secret, {
    expiresIn: expiresIn,
  });
};

export const loginUser = async (
  email: string,
  password: string,
  secretKey: string
) => {
  const user = await readOneUserByEmail({ email });
  if (!user.isOk) {
    throw new Error('Error occurred.');
  }
  const dbPassword = user.value.hashedPassword;
  const salt = user.value.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword.hashedPassword !== dbPassword) {
    throw new WrongPassword();
  }
  return await generateAccessToken(email + password, secretKey);
};

export const hashPassword = (
  password: string,
  salt: string | null = null
): { hashedPassword: string; salt: string } => {
  if (salt === null) {
    salt = randomBytes(16).toString('hex');
  }
  const saltedPassword = password + salt;
  const hashedPassword = createHash('sha256')
    .update(saltedPassword)
    .digest('hex');
  return { hashedPassword: hashedPassword, salt: salt };
};
