import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/users.model';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post{

    @ApiProperty({ example: 'Пост', description: 'Заголовок поста' })
    @Prop({ required: true, unique: true })
    title: string;

    @ApiProperty({ example: 'Это содержимое поста', description: 'Содержимое поста' })
    @Prop({ required: true })
    content: string;

    @ApiProperty({ example: 'true', description: 'Изображение' })
    @Prop({ default: false })
    image: string;

    @Prop({ required: true })
    userId: string;

    @ApiProperty({ type: () => User, description: 'Автор поста' })
    @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } })
    author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);