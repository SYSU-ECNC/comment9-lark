export const getSavedCard = () => ({
  elements: [] as never[],
  header: {
    title: {
      content: '✅ 保存成功',
      tag: 'plain_text',
    },
  }
})

export const getSettingsCard = (mode: string, color: string) => {
  const state = {
    mode,
    color,
  };

  return {
    "elements": [
      {
        "tag": "div",
        "text": {
          "tag": "lark_md",
          "content": "**弹幕位置**",
        },
        "extra": {
          "tag": "select_static",
          "initial_option": mode,
          "value": {
            ...state,
            id: 'mode',
          },
          "options": [
            {
              "text": {
                "tag": "plain_text",
                "content": "顶端滚动（默认）"
              },
              "value": "1"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "底端滚动"
              },
              "value": "2"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "顶端固定"
              },
              "value": "5"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "底端固定"
              },
              "value": "4"
            }
          ]
        }
      },
      {
        "tag": "div",
        "text": {
          "tag": "lark_md",
          "content": "**弹幕颜色**",
        },
        "extra": {
          "tag": "select_static",
          "initial_option": color,
          "value": {
            ...state,
            id: 'color',
          },
          "options": [
            {
              "text": {
                "tag": "plain_text",
                "content": "白色（默认）"
              },
              "value": "ffffff"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "红色"
              },
              "value": "fe0302"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "橙色"
              },
              "value": "ff7204"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "黄色"
              },
              "value": "ffd302"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "绿色"
              },
              "value": "00cd00"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "深蓝色"
              },
              "value": "4266be"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "浅蓝色"
              },
              "value": "89d5ff"
            },
            {
              "text": {
                "tag": "plain_text",
                "content": "粉色"
              },
              "value": "cc0273"
            },
          ]
        }
      },
      {
        "tag": "action",
        "actions": [
          {
            "tag": "button",
            "text": {
              "tag": "plain_text",
              "content": "保存"
            },
            "type": "primary",
            "value": {
              ...state,
              id: 'save',
            }
          }
        ]
      }
    ],
    "header": {
      "title": {
        "content": "🚀 弹幕设置",
        "tag": "plain_text"
      }
    }
  };
}