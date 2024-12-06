import { BadRequestException, Body, Controller, Get, Headers, Inject, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(
        @Inject("USER_SERVICE") private userService:ClientProxy,
        @Inject("AUTH_SERVICE") private authService:ClientProxy,

    ){

    }

    @Get('/get-all')
    async getAllUser(@Headers('authorization') authHeader: string) {
      try {
        // Gửi token tới microservice xác thực
        const decoded = await firstValueFrom(
          this.authService.send('verify-token', { authHeader }),
        );
  
        // Lấy userId từ token đã giải mã
        const userId = decoded.id;
        console.log(userId);
        
        // Lấy danh sách người dùng từ microservice user
        const listUser = await firstValueFrom(
          this.userService.send('get-user', ''),
        );
  
        return listUser;
      } catch (e) {
        throw new BadRequestException('Không thể xác thực token hoặc lấy dữ liệu');
      }
    }
    @Get("/get-user-by-id")
    async getUserById(@Headers('authorization') authHeader: string){
        const decoded = await firstValueFrom(
            this.authService.send('verify-token',{authHeader} ), // Gửi token cho microservice xác thực
          );
    
          const userId = decoded.id;
        let getUserById=await lastValueFrom(this.userService.send("get-user-by-id",userId))
        return getUserById
    }

    // @Put("/put-user-by-id")
    // async putUserById(authHeader:string,@Body() payload){
    //     const decoded = await firstValueFrom(
    //         this.authService.send('verify-token',{authHeader} ), // Gửi token cho microservice xác thực
    //       );
    
    //       const userId = decoded.id;
    //       const putCreate={
    //         user_id:userId,
    //         ...payload
    //       }
    //     let putUserById=await lastValueFrom(this.authService.send("put-user-by-id",putCreate))
    //     return putUserById
    // }
}
