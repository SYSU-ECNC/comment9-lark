import * as lark from '@larksuiteoapi/node-sdk';
import { appId, appSecret } from './config';

if (!appId || !appSecret) {
    throw new Error('Missing Lark AppID or AppSecret');
}

export const larkClient = new lark.Client({
    appId,
    appSecret,
    appType: lark.AppType.SelfBuild,
    domain: lark.Domain.Feishu,
});

export function sendTextMessage(content: string, chatId: string, replyToMessageId?: string) {
    const message = {
      msg_type: 'text',
      content: JSON.stringify({
        text: content,
      }),
    }
  
    if (replyToMessageId) {
      return larkClient.im.message.reply({
        data: message,
        path: {
          message_id: replyToMessageId,
        }
      });
    }
  
    return larkClient.im.message.create({
      params: {
        receive_id_type: 'chat_id',
      },
      data: {
        receive_id: chatId,
        ...message,
      }
    })
  }