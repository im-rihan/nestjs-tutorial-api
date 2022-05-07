import { Injectable } from '@nestjs/common';
import { User } from './types/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      username: 'rihan',
      password: 'rihan',
    },
    {
      username: 'rihan1',
      password: 'rihan1',
    },
    {
      username: 'rihan2',
      password: 'rihan2',
    },
    {
      username: 'rihan3',
      password: 'rihan3',
    },
  ];

  getUsers() {
    return this.users;
  }

  getUserByUserName(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
