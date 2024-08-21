import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';
import { CategoryModule } from './category/category.module';
import { TasksModule } from './tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), 
    JwtModule.register({global: true}), 
    AuthModule, 
    CategoryModule, 
    TasksModule,
    UploadsModule, 
    UsersModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
