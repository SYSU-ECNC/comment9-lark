enum DanmakuMode {
  TOP_SCROLL = '1',
  BOTTOM_SCROLL = '2',
  TOP_FIXED = '5',
  BOTTOM_FIXED = '4',
}

export const DEFAULT_DANMAKU_MODE = DanmakuMode.TOP_SCROLL;
export const DEFAULT_DANMAKU_COLOR = 'ffffff';

export const appId = process.env.LARK_APP_ID;
export const appSecret = process.env.LARK_APP_SECRET;
export const verificationToken = process.env.LARK_VERIFICATION_TOKEN;
export const danmakuHost = process.env.DANMAKU_HOST;
export const activity = process.env.DANMAKU_ACTIVITY;
export const tokenName = process.env.DANMAKU_TOKEN_NAME;
export const tokenValue = process.env.DANMAKU_TOKEN_VALUE;
