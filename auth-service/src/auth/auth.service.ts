import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Hàm giải mã token
  async verifyToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      if (!decoded) {
        throw new Error('Token không hợp lệ');
      }
      return decoded;
    } catch (error) {
      throw new Error('Token không hợp lệ');
    }
  }

  // Hàm lấy token từ header
  extractToken(authHeader: string): string {
    const token = authHeader?.split(' ')[1]; // Lấy token từ Authorization header
    if (!token) {
      throw new Error('Token không tồn tại');
    }
    return token;
  }
}