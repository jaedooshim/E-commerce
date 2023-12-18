import { JwtPayload } from 'jsonwebtoken';
export interface IPayload extends JwtPayload {
  id: string;
  name: string;
  nickname: string;
  email: string;
}
