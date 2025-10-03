import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userRepository: Model<User>,
        private roleService: RolesService) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await createdUser.$set('roles', [role]);
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find().populate('roles').exec();
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ email }).populate('roles').exec();
        return user;
    }
}
