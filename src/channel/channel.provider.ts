import { Injectable } from '@nestjs/common';
import { Channel } from './channel.entity';

@Injectable()
export class ChannelProvider {
  private channels = new Map<string, Channel>();

  getChannel(id: string): Channel | undefined {
    return this.channels.get(id);
  }

  getChannelsByUser(userId: string): Channel[] {
    return Array.from(this.channels.values()).filter((channel) =>
      channel.participants.includes(userId),
    );
  }

  createChannel(channel: Channel): Channel {
    this.channels.set(channel.id, channel);
    return channel;
  }

  updateChannel(id: string, channel: Partial<Channel>): Channel | undefined {
    const existingChannel = this.channels.get(id);
    if (!existingChannel) {
      return undefined;
    }
    const updatedChannel = new Channel({ ...existingChannel, ...channel });
    this.channels.set(id, updatedChannel);
    return updatedChannel;
  }

  deleteChannel(id: string): boolean {
    return this.channels.delete(id);
  }
}
