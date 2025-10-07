import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.model';
import { FileService } from 'src/file/file.service';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postRepository: Model<Post>,
                                   private fileService: FileService) { }

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({...dto, image: fileName});
        return post;
    }
}
