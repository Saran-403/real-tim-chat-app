import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { MessageProvider } from './message.provider';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(private messageProvider: MessageProvider) {}

  addMessage(messageDto: MessageDto) {
    const message = new Message(messageDto);
    this.messageProvider.addMessage(message);
  }

  getMessagesByChannel(channelId: string): Message[] {
    return this.messageProvider.getMessagesByChannel(channelId);
  }
}
