import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
    @Prop({ required: true })
    email: string;

    @ApiProperty({ example: '123456', description: 'Пароль пользователя' })
    @Prop({ required: true })
    password: string;

    @ApiProperty({ example: 'true', description: 'Является ли пользователь забаненым' })
    @Prop({ default: false })
    banned: boolean;

    @ApiProperty({ example: 'Оскорбление администрации', description: 'Причина бана' })
    @Prop()
    banReason: string;

    @ApiProperty({ type: [Role], description: 'Список ролей этого пользователя' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: Role[];

    @ApiProperty({ type: [Post], description: 'Список постов этого пользователя' })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);