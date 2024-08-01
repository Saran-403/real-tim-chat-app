import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageProvider } from './message.provider';

@Module({
  providers: [MessageService, MessageProvider],
  exports: [MessageService],
})
export class MessageModule {}
