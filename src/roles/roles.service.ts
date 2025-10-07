import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleRepository: Model<Role>){}

    async createRole(dto: CreateRoleDto): Promise<Role>{
        const createdRole = new this.roleRepository(dto);
        return createdRole.save();
    }

    async getRoleByValue(value: string){
        const role = await this.roleRepository.findOne({value}).populate('users').exec();
        return role;
    }
}
