import { Injectable } from '@nestjs/common';
import { ChannelDto } from './dto/channel.dto';

@Injectable()
export class ChannelService {
  private channels = new Map<string, any>();
  private messages = new Map<string, any>();

  async getChannel(id: string) {
    const channel = this.channels.get(id);
    if (!channel) {
      return {
        statusCode: '404',
        message: 'Channel not found.',
      };
    }
    return channel;
  }

  async getChannelsByUser(userId: string) {
    const channels = Array.from(this.channels.values()).filter((channel) =>
      channel.participants.includes(userId),
    );
    const lastMessages = channels.map((channel) =>
      this.messages.get(channel.id),
    );
    return {
      lastMessages,
      channels,
    };
  }

  async createChannel(channelDto: ChannelDto) {
    const id = (Math.random() * 1000000).toString();
    const channel = { id, ...channelDto };
    this.channels.set(id, channel);
    return {
      statusCode: '201',
      message: 'Channel created successfully.',
      channel,
    };
  }

  async updateChannel(id: string, channelDto: ChannelDto) {
    if (!this.channels.has(id)) {
      return {
        statusCode: '404',
        message: 'Channel not found.',
      };
    }
    const channel = { id, ...channelDto };
    this.channels.set(id, channel);
    return {
      statusCode: '200',
      message: 'Channel updated successfully.',
    };
  }

  async deleteChannel(id: string) {
    if (!this.channels.has(id)) {
      return {
        statusCode: '404',
        message: 'Channel not found.',
      };
    }
    this.channels.delete(id);
    return {
      statusCode: '200',
      message: 'Channel deleted successfully.',
    };
  }
}
