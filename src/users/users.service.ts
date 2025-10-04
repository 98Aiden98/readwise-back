import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userRepository: Model<User>,
        private roleService: RolesService) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const createdUser = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");
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

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            if (!user.roles.includes(role)) {
                user.roles.push(role);
                await user.save();
            }
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async ban (dto: BanUserDto) {
        const user = await this.userRepository.findById(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user.populate('roles');
    }
}
