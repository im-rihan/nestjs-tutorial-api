import { Injectable } from '@nestjs/common';
import { SerializesUser, User } from './types/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './../typeorm/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [];

  getUsers() {
    return this.users.map((user) => new SerializesUser(user));
  }

  getUserByUserName(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }
}
