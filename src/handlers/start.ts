import { Keyboard } from 'grammy'
import { findOrCreateUser } from '@/models/User'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStart(ctx: Context) {
  await ctx.replyWithLocalization('send_news_feed', {
    ...sendOptions(ctx),
    reply_markup: instructionMenu,
  })
}
