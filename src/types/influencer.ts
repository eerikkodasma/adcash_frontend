import { Employee } from "./employee";

export enum SOCIAL_MEDIA_PLATFORM {
  INSTAGRAM = "INSTAGRAM",
  TIKTOK = "TIKTOK",
}

export interface SocialMediaAccount {
  id: number | null;
  platform: SOCIAL_MEDIA_PLATFORM;
  username: string;
}

export const initialSocialMediaAccountState: SocialMediaAccount = {
  id: null,
  platform: SOCIAL_MEDIA_PLATFORM.INSTAGRAM,
  username: "",
};

export interface Influencer {
  id: number;
  first_name: string;
  last_name: string;
  social_media_accounts: SocialMediaAccount[];
  manager: Employee | null;
  manager_id: number | null;
}

export interface InfluencerFormData {
  first_name: string;
  last_name: string;
  social_media_accounts: SocialMediaAccount[];
  manager: Employee | null;
  manager_id: number | null;
}

export const initalInfluencerFormState: InfluencerFormData = {
  first_name: "",
  last_name: "",
  social_media_accounts: [],
  manager: null,
  manager_id: null,
};

export const enum INFLUENCER_CRUD {
  CREATE = "CREATE",
  READ = "READ",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}
