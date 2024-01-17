import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleStart(ctx: Context) {
  await ctx.replyWithLocalization('start', {
    ...sendOptions(ctx),
    reply_markup: getI18nKeyboard(ctx.dbuser.language, 'NextChange'),
  })
}
