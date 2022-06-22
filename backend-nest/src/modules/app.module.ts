import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from './users.module';
import { SpotifyModule } from './spotify.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule,
    UsersModule,
    SpotifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
