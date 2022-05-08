import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  username: string;
  password: string;
}

export class SerializesUser {
  id: number;
  username: string;

  @Exclude()
  password: string;
  constructor(partial: Partial<SerializesUser>) {
    Object.assign(this, partial);
  }
}
