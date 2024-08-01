import { Injectable, Inject } from '@nestjs/common';
import { Message } from 'src/message/message.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MessageService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  async getMessage({ id }: { id: string }) {
    return await Message.findOne({ where: { id } });
  }

  async getMessagesByChannel({ id }: { id: string }) {
    return await Message.findAll({ where: { channelId: id } });
  }

  async addMessage(messageData: any) {
    return await Message.create(messageData);
  }

  async updateMessage({ id, message }: { id: string; message: any }) {
    const existingMessage = await Message.findOne({ where: { id } });
    if (existingMessage) {
      return await existingMessage.update(message);
    }
    return null;
  }

  async deleteMessage({ id }: { id: string }) {
    const message = await Message.findOne({ where: { id } });
    if (message) {
      await message.destroy();
      return { deleted: true };
    }
    return { deleted: false };
  }
}
