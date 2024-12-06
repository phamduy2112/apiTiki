import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('comment')
export class CommentController {
    constructor(
        @Inject("COMMENT_SERVICE") private commentService:ClientProxy,
    ){}

    @Post('/create-comment')
    async createCommentWithId( @Body() payload) {
      const data = { ...payload }; // Gộp `id` vào `payload` hoặc sử dụng theo ý bạn.
      const createdComment = await lastValueFrom(
        this.commentService.send('create-comment', data),
      );
      return createdComment;
    }

    @Post('/delete-comment/:idComment')
    async deleteCommentWithId(@Param('idComment') id: string, @Body() payload) {
      const data = { ...payload, product_id:id }; // Gộp `id` vào `payload` hoặc sử dụng theo ý bạn.
      const createdComment = await lastValueFrom(
        this.commentService.send('put-comment', data),
      );
      return createdComment;
    }
    @Post('/put-comment/:idComment')
    async putCommentWithId(@Param('idComment') id: string, @Body() payload) {
      const data = { ...payload, product_id:id }; // Gộp `id` vào `payload` hoặc sử dụng theo ý bạn.
      const createdComment = await lastValueFrom(
        this.commentService.send('put-comment', data),
      );
      return createdComment;
    }
    @Post('/put-comment/:idProduct')
    async getCommentWithId(@Param('idProduct') id: string, @Body() payload) {
      const data = { ...payload, product_id:id }; // Gộp `id` vào `payload` hoặc sử dụng theo ý bạn.
      const createdComment = await lastValueFrom(
        this.commentService.send('get-comment-by-id', data),
      );
      return createdComment;
    }
 
    }
