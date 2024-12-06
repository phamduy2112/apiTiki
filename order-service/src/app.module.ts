import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderController } from './order/order.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
