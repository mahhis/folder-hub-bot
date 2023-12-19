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
    case 'Give':
      keyboard = new Keyboard().text(i18n.t(lng, 'give_new_folder'))
      return keyboard
    case 'YesNo':
      keyboard = new Keyboard()
        .text(i18n.t(lng, 'yes'))
        .row()
        .text(i18n.t(lng, 'no'))
      return keyboard
  }
}
