import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
  providers: [PrismaService]
})
export class AppModule { }
