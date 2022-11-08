export type RssInfo = {
  title: string;
  description: string;
  link: string;
  pubDate: Date;
};

export type GeriraInfo = {
  level: 1 | 2 | 3;
  roomId: string;
  endTime: Date;
};
