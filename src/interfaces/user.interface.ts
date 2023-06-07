export interface User {
  isAuth: boolean;
  hasInstagram: boolean;
  instagramIndex: number;
  instagramId: string;
  instagrams: any[];
  hasTiktok: boolean;
  tiktokId: string;
  tiktoks: any[];
  tiktokIndex: number;
  setHasInstagram: (value: boolean) => void;
  setInstagrams: (value: any[]) => void;
  setInstagramIndex: (value: number) => void;
  setInstagramId: (value: string) => void;
  setHasTiktok: (value: boolean) => void;
  settiktoks: (value: any[]) => void;
  settiktokId: (value: string) => void;
  settiktokIndex: (value: number) => void;
}
