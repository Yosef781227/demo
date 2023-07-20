export interface User {
  isAuth: boolean;
  instagram_user_profile: any;
  hasInstagram: boolean;
  instagramIndex: number;
  instagramId: string;
  instagrams: any[];
  hasTiktok: boolean;
  tiktokId: string;
  name: string;
  email: string;
  tiktoks: any[];
  tiktokIndex: number;
  collections: any[];
  setCollections: (value: any) => void;
  setHasInstagram: (value: boolean) => void;
  setInstagrams: (value: any[]) => void;
  setInstagramIndex: (value: number) => void;
  setInstagramId: (value: string) => void;
  setHasTiktok: (value: boolean) => void;
  settiktoks: (value: any[]) => void;
  settiktokId: (value: string) => void;
  settiktokIndex: (value: number) => void;
}
