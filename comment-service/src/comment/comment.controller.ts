import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { responseSend } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('comment')
export class CommentController {
constructor(private prismaService:PrismaService){}

@MessagePattern("get-comment-by-id")
async getCommentById(product_id:number,createData:any){
    try{
        const data={
            product_id,
            context:createData.context,
            start_comment:createData.start_comment
        }
        const responsive=await this.prismaService.comment.create({data})
        return responseSend(responsive,"Create comment successfully!",200)
    }catch(e){

    }
}
@MessagePattern("create-comment")
async createComment(createData:any){
    try{
        const data={
            product_id:createData.product_id,
            context:createData.context,
            start_comment:createData.start_comment
        }
        const responsive=await this.prismaService.comment.create({data})
        return responseSend(responsive,"Create comment successfully!",200)
    }catch(e){

    }
}

@MessagePattern("put-comment")
async putComment(updateData:any){
    try{
        const commemtDetail=await this.prismaService.comment.findFirst({
            where:{
                 comment_id:updateData.comment_id
            }
        })
        const data={
           
            context:updateData.context,
        }
        const responsive=await this.prismaService.comment.update(
     {
        where:{comment_id:updateData.comment_id},
        data:updateData
     }
        )
        return responseSend(responsive,"Update comment successfully!",200)
    }catch(e){

    }
}

@MessagePattern("delete-comment")
async deleteComment(comment_id:number){
    try{
        const commemtDetail=await this.prismaService.comment.findFirst({
            where:{
                comment_id
            }
        })
        if(!commemtDetail){
            return responseSend([],"Don't find comment!",200)

        }
        const responsive=await this.prismaService.comment.delete({
            where:{
                comment_id
            }
        })
        return responseSend(responsive,"Delete comment successfully!",200)

    }catch(e){

    }
}

}
