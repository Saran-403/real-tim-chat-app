export class Message {
  userId: string;
  text: string;
  images: string[];
  channelId: string;
  user: {
    username: string;
  };

  constructor(partial: Partial<Message>) {
    Object.assign(this, partial);
  }
}
