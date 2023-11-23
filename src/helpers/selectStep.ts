import { findOrCreateUrl } from '@/models/Url'
import { getRandomUrl, getUrl, isURL } from '@/handlers/url'
import Context from '@/models/Context'
import i18n from '@/helpers/i18n'
import sendOptions from '@/helpers/sendOptions'

type FunctionWithContext = (ctx: Context) => void

const rout = new Map<string, FunctionWithContext>()

rout.set('waiting_for_url', getUrl)
rout.set('alredy_shared', getRandomUrl)

export default async function selectStep(ctx: Context) {
  const temp = await rout.get(ctx.dbuser.step)

  if (isURL(ctx.msg!.text!)) {
    const url = ctx.msg!.text
    await findOrCreateUrl(url!)
    ctx.dbuser.step = 'alredy_shared'
    await ctx.dbuser.save()

    const randomUrl = await getRandomUrl()

    console.log(123)
    console.log(randomUrl)

    return await ctx.replyWithLocalization(
      'send_url',
      sendOptions(ctx, undefined, { url: randomUrl })
    )
  }

  if (temp) {
    if (i18n.t(ctx.dbuser.language, 'get_new_news') === ctx.msg?.text) {
      return await temp(ctx)
    } else {
      return await ctx.replyWithLocalization('help', sendOptions(ctx))
    }
  }
}
1