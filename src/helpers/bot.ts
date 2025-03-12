import { Bot, Keyboard } from 'grammy'
import Context from '@/models/Context'
import env from '@/helpers/env'
import i18n from '@/helpers/i18n'

export const bot = new Bot<Context>(env.TOKEN, {
  ContextConstructor: Context,
})

export function getI18nKeyboard(lng: string, type: string) {
  let keyboard: Keyboard
  switch (type) {
    case 'NextChange':
      keyboard = new Keyboard()
        .text(i18n.t(lng, 'change'))
        .text(i18n.t(lng, 'next'))
        .resized().persistent();
      return keyboard
    case 'YesNo':
      keyboard = new Keyboard()
        .text(i18n.t(lng, 'no'))
        .text(i18n.t(lng, 'yes')).resized().oneTime()
      return keyboard
    case 'StreamSelection':
      keyboard = new Keyboard()
        .text(i18n.t(lng, 'random'))
        .text(i18n.t(lng, 'specific')).resized().oneTime();
      return keyboard
  }
}
