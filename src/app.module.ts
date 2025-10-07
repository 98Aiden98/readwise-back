import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname,'static'),
        }),
        MongooseModule.forRoot(process.env.MONGO_URI || ''),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FileModule,
    ],
})
export class AppModule { }