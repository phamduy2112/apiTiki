import { Controller } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { MessagePattern, Payload } from '@nestjs/microservices';
import { responseSend } from 'src/model/response';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
constructor(
    private readonly authService: AuthService,
    private prismaService:PrismaService,
    private jwtService:JwtService
){}
private async hashPassword(password:string){
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const hash=await bcrypt.hash(password,salt);
    return hash
  }
  private async generaToken (payload:any){
    const access_token=await this.jwtService.signAsync(payload)
    
    return {access_token}
    }

    @MessagePattern("register")
    async register(createAuthDto:any){
      try{
        const hashPassword = await this.hashPassword(createAuthDto.password);
        const existingUser = await this.prismaService.users.findFirst({
          where: {
              email: createAuthDto.email,
          },
      });
  
      if (existingUser) {
     return responseSend('','Trùng Email',400)
      }
  
   const addUser= await this.prismaService.users.create({
          data: { ...createAuthDto, password: hashPassword },
      });
    return  responseSend(addUser,'Thành công',200)
      }catch(e){
        console.log(e);
        return  responseSend(e,'Thất bại',500)
  
      }
    }

    @MessagePattern("login")
    async login(createAuthDto: any) {
      try {
        const user = await this.prismaService.users.findFirst({
          where: { email: createAuthDto.email },
        });
  
        if (!user) {
          return responseSend('', 'Email hoặc mật khẩu không đúng', 400);
        }
  
        const isPasswordValid = await bcrypt.compare(createAuthDto.password, user.password);
        if (!isPasswordValid) {
          return responseSend('', 'Email hoặc mật khẩu không đúng', 400);
        }
  
        const payload = { id: user.user_id };
        const access_token = await this.generaToken(payload);
  
        return responseSend(access_token, 'Đăng nhập thành công!', 200);
      } catch (error) {
        console.error(error);
        return responseSend(null, 'Đăng nhập thất bại', 500);
      }
    }
  
    @MessagePattern('verify-token')
    async handleVerifyToken(@Payload() payload: { authHeader: string }) {
      console.log('Nhận payload:', payload);
      const token = payload?.authHeader?.split(' ')[1];
      if (!token) {
        throw new Error('Token không hợp lệ.');
      }
      return this.jwtService.verifyAsync(token);
    }
}
