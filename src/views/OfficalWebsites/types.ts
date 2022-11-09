export type Link = {
  text: string;
  url: string;
};

export type WebsiteLink = Link;
export type TwitterLink = string;
export type YouTubeLink = Link;

export type OfficialWebsiteContent = {
  name: string;
  icon: string;
  links: Link[];
};
