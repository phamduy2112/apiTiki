import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { responseSend } from 'src/models/response';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Controller('user')
export class UserController {
    constructor(private prismaService: PrismaService) {}

  @MessagePattern("get-user")
  async getUser() {
    try {
      const responsive = await this.prismaService.users.findMany();
      return responseSend(responsive, 'Lấy danh sách người dùng thành công!', 200);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách người dùng:', error);
      return responseSend(null, 'Lỗi khi lấy danh sách người dùng', 500);
    }
  }

  @MessagePattern("get-user-by-id")
  async getUserById(id:number){
    try{
      const userDetail = await this.prismaService.users.findFirst({
        where: { user_id:id }, 
      });
      return responseSend(userDetail, 'User details retrieved successfully!', 200);    }catch(e){

    }
  }

  @MessagePattern("put-user-by-id")
  async putUserById(updateData:any){
    try{
      const userDetail = await this.prismaService.users.findFirst({
        where: { user_id:updateData.user_id }, 
      });
          // If there's a password in updateData, hash it
          if (updateData.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
          }
      
      if(!userDetail){
        return responseSend(null, 'Người dùng không tồn tại!', 200);    }
        const updatedUser=await this.prismaService.users.update({
          where:{user_id:updateData.user_id},
          data:updateData
         })
   
      return responseSend(updatedUser, 'User updated successfully!', 200);
      }

      
      
    catch(e){

    }
  }

}