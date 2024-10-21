import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

interface DecodedToken {
  _id?: string;
  email?: string;
  username?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

const decryptToken = (): DecodedToken | null => {
  const token = Cookies.get('authToken');
  console.log(" this is decode token ", token)
  if (!token) {
    console.error('No access token found');
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
    console.log("here is the decodeToken", decoded);
    return decoded;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export default decryptToken;
