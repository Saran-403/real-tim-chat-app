export class Channel {
  id: string;
  participants: string[];
  admins?: string[];
  image: string;
  name: string;
  description: string;

  constructor(partial: Partial<Channel>) {
    Object.assign(this, partial);
  }
}
