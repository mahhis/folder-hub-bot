import { Keyboard } from 'grammy'
import { findOrCreateUser } from '@/models/User'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStart(ctx: Context) {
  await ctx.replyWithLocalization(
    'send_news_feed',
    sendOptions(ctx, instructionMenu)
  )
  if (ctx.dbuser.step === 'start') {
    ctx.dbuser.step = 'waiting_for_url'
    await ctx.dbuser.save()
  }
}
