import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('order')
export class OrderController {
    constructor(        @Inject("ORDER_SERVICE") private orderService:ClientProxy
){
    }

    @Post("create-order")
    async createOrder(@Body() payload){
        let createOrder=await lastValueFrom(this.orderService.send("create-order-by-id-user",payload))
        
    }
}
