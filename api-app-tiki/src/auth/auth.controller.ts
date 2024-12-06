import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
    constructor(
        @Inject("AUTH_SERVICE") private authService:ClientProxy,
    ){

    }
    @Post("/register")
    async register(@Body() payload){
        let register=await lastValueFrom(this.authService.send("register",payload))
        return register
    }
    
    @Post("/login")
    async login(@Body() payload){
        let login=await lastValueFrom(this.authService.send("login",payload))
        return login
    }

  
}
