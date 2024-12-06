import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { responseSend } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('order')
export class OrderController {

    constructor(
        private prismaService:PrismaService
    ){}

    @MessagePattern('get-order-by-id-user')
    async getOrderByIdUser(id:number){
        try{
            const responsive=await this.prismaService.orders.findMany({
                where:{
                    user_id:id
                }
            })
            return responseSend(responsive, 'Lấy danh sách người dùng thành công!', 200);

        }catch(e){

        }
    }
    @MessagePattern('create-order-by-id-user')
    async createOrderByIdUser(dataCreate:any){
        try{
            const responsive=await this.prismaService.orders.create({
                data:dataCreate
            })
            return responseSend(responsive, 'Lấy danh sách người dùng thành công!', 200);

        }catch(e){

        }
    }
}
