export interface UserSetting {
  mode: string;
  color: string;
}

export const userSettingsCache = new Map<string, UserSetting>();