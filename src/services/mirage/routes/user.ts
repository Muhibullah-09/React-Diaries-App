import { Response, Request } from 'miragejs';
import { handleErrors } from '../server';
import { User } from '../../../interfaces/user.interface';
import { randomBytes } from 'crypto';


const generateToken = () => randomBytes(8).toString('hex');


export interface AuthResponse {
  token: string;
  user: User;
};


const login = (schema: any, req: Request): AuthResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });
  if (!user) {
    return handleErrors(null, 'No user with that username exists');
  }
  if (password !== user.password) {
    return handleErrors(null, 'Password is incorrect');
  }
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};


const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.findBy({ username: data.username });
  if (exUser) {
    return handleErrors(null, 'A user with that username already exists.');
  }
  const user = schema.users.create(data);
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};


export default {
  login,
  signup,
};
// The login and signup methods here receive a Schema class and a fake Request 
// object and, upon validating the password or checking that the login does not already exist, 
// return the existing user or a new user respectively. We use the Schema object to interact with Mirage’s ORM, 
// while the Request object contains information about the intercepted request including the request body and headers.
// Next, let’s add methods for working with diaries and diary entries. Create a file named diary.ts in your routes directory: