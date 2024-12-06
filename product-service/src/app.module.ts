import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductController } from './product/product.controller';

import { RedisModule } from './redis/redis.module';


@Module({
  imports: [PrismaModule,

    RedisModule
  ],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
