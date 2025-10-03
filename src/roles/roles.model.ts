import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.model';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {

    @ApiProperty({example: 'ADMIN', description: 'Уникальное значение роли пользователя'})
    @Prop({required: true})
    value: string;

    @ApiProperty({example: 'Администратор', description: 'Описание роли пользователя'})
    @Prop({required: true})
    description: string;

    @ApiProperty({ type: [String], description: 'Список пользователей с этой ролью' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);