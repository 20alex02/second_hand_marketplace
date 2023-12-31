import jwt, { Secret } from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import user from '../repositories/user';
import { WrongPassword, InvalidToken } from '../errors/controllersErrors';
const expiresIn = '2h';

const generateAccessToken = async (uuid: string, secretKey?: string) => {
  return jwt.sign({ uuid: uuid }, secretKey as Secret, {
    expiresIn: expiresIn,
  });
};

export const loginUser = async (
  email: string,
  password: string,
  secretKey?: string
) => {
  const userResult = await user.read.one({ email });
  if (userResult.isErr) {
    throw userResult.error;
  }
  const dbPassword = userResult.value.hashedPassword;
  const salt = userResult.value.salt;
  const hashedPassword = hashPassword(password, salt);
  if (hashedPassword.hashedPassword !== dbPassword) {
    throw new WrongPassword();
  }
  const token = await generateAccessToken(userResult.value.id, secretKey);
  const role = userResult.value.role;
  return { token, role };
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

export const getUserId = (authorization?: string, secretKey?: string) => {
  const token = authorization && authorization.split(' ')[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, secretKey ?? 'undefined') as {
        uuid: string;
      };

      return decodedToken.uuid;
    } catch (error) {
      throw new InvalidToken();
    }
  } else {
    throw new Error();
  }
};
