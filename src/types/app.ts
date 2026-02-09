export type DailyUpdate = {
  day: string;
  revenue: string;
  onWaitlist: number;
  workDone: string[];
  status: 'done' | 'current' | 'future';
};

export type ProductProgress = {
  name: string;
  logoKey: string;
  logo: string;
  tagline: string;
  website: string;
  updates: DailyUpdate[];
};

export type SocialAccount = {
  key: string;
  name: string;
  tooltip: string;
  url: string;
};

export type RawDailyUpdate = Omit<DailyUpdate, 'day' | 'status' | 'workDone'> & {
  day?: string;
  status: string;
  waitlistCount?: number;
  signUps?: number;
  workDone: string[] | string;
};

export type RawProductProgress = Omit<ProductProgress, 'logo' | 'updates'> & {
  updates: RawDailyUpdate[];
};
