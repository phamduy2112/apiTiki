import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';



@Controller('product')
export class ProductController {

    constructor(
        // CacheModule

        @Inject("PRODUCT_SERVICE") private authService:ClientProxy,
    ){

    }

@Post("get-redis")
async abc(){
    let responsive=await lastValueFrom(this.authService.send("get-redis-value",''))
    return responsive
}

    @Get("/get-all-product")
    async getAllProduct(){
        let responsive=await lastValueFrom(this.authService.send("get-product",''))
        return responsive
    }
}
