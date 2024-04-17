import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`Todo with username ${username} not found`);
    }
    return user;
  }
}
