import { ObjectId } from 'mongodb'
import { Url, UrlModel } from '@/models/Url'
import { UserModel } from '@/models/User'
import { getI18nKeyboard } from '@/helpers/bot'
import { getNewUrl } from '@/models/Url'
import Context from '@/models/Context'
import i18n from '@/helpers/i18n'
import sendOptions from '@/helpers/sendOptions'

export default async function handleGive(ctx: Context) {
  if (ctx.dbuser.step === 'alredy_shared') {
    const urlObjectID = await getNewUrl(ctx.dbuser)
    if (urlObjectID) {
      const url = await UrlModel.findById(urlObjectID._id)
      if (url!.user) {
        const user = await UserModel.findById(url!.user)
        const urlID: ObjectId = url!._id
        ctx.dbuser.receivedUrlsID?.push(urlID)
        await ctx.dbuser.save()
        await ctx.replyWithLocalization(
          'send_url',
          sendOptions(ctx, { author: user!.username, url: url!.url })
        )
      } else {
        await ctx.replyWithLocalization(
          'send_url',
          sendOptions(ctx, { author: 'remained anonymous', url: url!.url })
        )
      }
    } else {
      await ctx.replyWithLocalization('end', sendOptions(ctx))
    }
  } else {
    await ctx.replyWithLocalization('send_news_feed', sendOptions(ctx))
  }
}
