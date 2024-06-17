import {database} from "../database";
import {GET_USER_QUERY} from "../database/get";
import {compare} from "bcryptjs";

interface LoginData {
  telegramID: string;
  password: string;
  token: string;
}

export const login = async (loginData: LoginData) => {
  const {telegramID, password, token} = loginData;

  return new Promise<{ status: number; message: string; user?: any }>((resolve, reject) => {
    database.get(GET_USER_QUERY, [telegramID], async (error: Error, row: any) => {
      if (error) {
        reject({status: 500, message: 'Error logging in'});
      } else if (!row || !(await compare(password, row.password)) || row.token !== token) {
        resolve({status: 400, message: 'Invalid credentials'});
      } else {
        resolve({status: 200, message: 'Login successful'});
      }
    });
  })
    .catch((error: Error) => {
        console.error('Error in user login:', error);
        return {status: 500, message: 'Error logging in'};
      }
    )
};