import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InMemoryStorageService } from './memorystorage/in-memory-storage.service';
import { ChatGateway } from './chat/chat.gateway';
import { User } from './user/user.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService, InMemoryStorageService, ChatGateway],
})
export class AppModule {}
