import { Bot, Keyboard } from 'grammy'
import Context from '@/models/Context'
import env from '@/helpers/env'
import i18n from '@/helpers/i18n'

export const bot = new Bot<Context>(env.TOKEN, {
  ContextConstructor: Context,
})

export function getI18nKeyboard(lng: string) {
  const keyboard = new Keyboard().text(i18n.t(lng, 'get_new_news')).row()
  return keyboard
}
