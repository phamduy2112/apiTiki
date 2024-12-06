import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { responseSend } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('shipping')
export class ShippingController {
    constructor(
        private prismaService:PrismaService
    ){}
    @MessagePattern('create-order-by-id-user')
    async createOrderByIdUser(dataCreate:any){
        try{
            const responsive=await this.prismaService.shipping.create({
                data:dataCreate
            })
            return responseSend(responsive, 'Lấy danh sách người dùng thành công!', 200);

        }catch(e){

        }
    }
}
