import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { responseSend } from 'src/models/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('product')
export class ProductController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,

        private prismaService:PrismaService){}

    @MessagePattern("get-product")
    async getAllProduct(){
        try{
            const cachedProducts=await this.cacheManager.get("all_products");
            if(cachedProducts){

                return { data: cachedProducts, message: 'Lấy danh sách sản phẩm thành công!', statusCode: 200 };

            }
            const responsive=await this.prismaService.products.findMany(
                {
                    include: {
                        brands: true,
                        categories: true,

                      },
                }
            );
            await this.cacheManager.set("all_product",responsive,3600)
            return { data: responsive, message: 'Lấy danh sách sản phẩm thành công!', statusCode: 200 };

        }catch(e){

        }
    }
    @MessagePattern('get-redis-value')
    async getRedisValue() {
    //   const value = await this.cacheManager.get('mykey');
      return this.cacheManager.set('key', 'value', 1000);
    //   return { value };
    }

    @MessagePattern('get-product-by-id')
    async getProductById(id:number){
        const responsive = await this.prismaService.products.findFirst({
            where: { product_id: id },
            include: {  // Kết hợp thêm dữ liệu từ bảng categories
                categories: true,
                brands: true,

            }
        });
        return responseSend(responsive, 'Lấy danh sách người dùng thành công!', 200);
    }


}
