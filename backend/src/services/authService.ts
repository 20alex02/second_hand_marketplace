import jwt, { Secret } from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { readOneUserByEmail } from '../repositories/user/read';
import WrongPassword from '../exceptions/WrongPassword';
import TokenIsNotValid from '../exceptions/NotAuthorized';
const expiresIn = '2h';

const generateAccessToken = async (uuid: string, secretKey: string) => {
  return jwt.sign({ uuid: uuid }, secretKey as Secret, {
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
  return await generateAccessToken(user.value.id, secretKey);
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

export const getUserId = (token: string | undefined, secretKey: string) => {
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey) as { uuid: string };

      return decodedToken.uuid;
    } catch (error) {
      throw new TokenIsNotValid();
    }
  } else {
    throw new Error();
  }
};
