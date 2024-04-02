import { MemberService } from '@/modules/member/member.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, MemberService]
})
export class AuthModule {}
