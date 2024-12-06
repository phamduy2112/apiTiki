import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommentController } from './comment/comment.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, CommentController],
  providers: [AppService],
})
export class AppModule {}
