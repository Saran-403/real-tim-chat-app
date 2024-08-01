import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageProvider {
  private messages = new Map<string, Message[]>();

  addMessage(message: Message) {
    const channelMessages = this.messages.get(message.channelId) || [];
    channelMessages.push(message);
    this.messages.set(message.channelId, channelMessages);
  }

  getMessagesByChannel(channelId: string): Message[] {
    return this.messages.get(channelId) || [];
  }
}
