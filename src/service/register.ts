import {hash} from 'bcryptjs';
import {database} from '../database';
import {GET_USER_QUERY} from "../database/get";
import {INSERT_USER_QUERY_WITH_TOKEN} from "../database/insert";

interface UserRegistrationData {
  telegramID: string;
  password: string;
  token: string;
}

export const register = async (userData: UserRegistrationData) => {
  const {telegramID, password, token} = userData;

  return new Promise<{ status: number; message: string }>((resolve, reject) => {
    database.get(GET_USER_QUERY, [telegramID], async (error: Error, row: any) => {
      if (error) {
        console.error('Error in user registration:', error);
        reject({status: 500, message: 'Error registering user'});
        return;
      }

      if (row) {
        resolve({status: 403, message: 'User already exists'});
        return;
      }

      // new user
      const hashedPassword = await hash(password, 10);
      const createdAt = new Date();

      database.run(
        INSERT_USER_QUERY_WITH_TOKEN,
        [telegramID, hashedPassword, token, '', 0, createdAt],
        (error: Error | null) => {
          if (error) {
            console.error('Error in user registration:', error);
            reject({status: 500, message: 'Error registering user'});
            return;
          }

          resolve({status: 201, message: 'User registered successfully'});
        }
      );
    });
  })
    .catch((error) => {
      console.error('Error in registerUserService:', error);
      return {status: 500, message: 'Error registering user'};
    })
};


