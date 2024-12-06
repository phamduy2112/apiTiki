import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShippingController } from './shipping/shipping.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, ShippingController],
  providers: [AppService],
})
export class AppModule {}
