import * as lark from '@larksuiteoapi/node-sdk';
import { getSettingsCard, getSavedCard } from './card';
import type { Request, Response, NextFunction } from 'express'
import { larkClient, sendTextMessage } from './lark';
import { io } from 'socket.io-client';
import { userSettingsCache } from './cache';
import { activity, danmakuHost, DEFAULT_DANMAKU_COLOR, DEFAULT_DANMAKU_MODE, tokenName, tokenValue, verificationToken } from './config';

if (!danmakuHost) {
    throw new Error('Missing Danmaku Host');
}

const socketIOClient = io(danmakuHost, {
  auth: {
    activity,
    tokenName,
    token: tokenValue,
  },
});

export const challengeSolver = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    if (req.body?.challenge) {
      res.send({
        challenge: req.body.challenge,
      });

      return;
    }

    next();
}

export const eventDispatcher = new lark.EventDispatcher({
    verificationToken,
  }).register({
    'im.message.receive_v1': async (data) => {
      const {
        chat_id: chatId,
        message_type: messageType,
        message_id: messageId,
        content
      } = data.message;
      
      const openId = data.sender.sender_id?.open_id;
      if (!openId) {
        return;
      }
  
      if (messageType !== 'text') {
        sendTextMessage('暂不支持此消息类型，请使用纯文本发弹幕~', chatId, messageId);
        return;
      }
  
      const { text } = JSON.parse(content);
      const { mode, color } = userSettingsCache.get(openId) ?? {
        mode: DEFAULT_DANMAKU_MODE,
        color: DEFAULT_DANMAKU_COLOR
      }

      if (text.trim() === '设置') {
        larkClient.im.message.create({
            params: {
              receive_id_type: 'chat_id',
            },
            data: {
              receive_id: chatId,
              msg_type: 'interactive',
              content: JSON.stringify(getSettingsCard(mode, color)),
            }
          }
        )

        return;
      }
  
      socketIOClient.emit('push', {
        mode,
        text,
        color: parseInt(color, 16),
        stime: Date.now(),
        userid: `lark:${openId}`,
      });

      larkClient.im.messageReaction.create({
        data: {
            reaction_type: {
                emoji_type: 'DONE',
            }
        },
        path: {
            message_id: messageId,
        }
      });
    }
  });

export const cardDispatcher = new lark.CardActionHandler({
    verificationToken,
}, async (data: any) => {
    const { action, open_id: openId } = data;
    let { id, mode, color } = action.value;

    if (id === 'save') {
        userSettingsCache.set(openId, { mode, color });
        return getSavedCard();
    }

    if (id === 'mode') {
        mode = action.option;
    }
    if (id === 'color') {
        color = action.option;
    }

    return getSettingsCard(mode, color);
})