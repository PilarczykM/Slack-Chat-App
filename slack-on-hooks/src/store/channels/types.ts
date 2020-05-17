export interface IChannel {
  id: string;
  channelDetails: string;
  channelName: string;
  createdBy: {
    name: string;
    email: string;
    avatar: string;
  };
}

export type IActivateChannel = IChannel | null;
