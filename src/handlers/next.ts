import { ObjectId } from 'mongodb'
import { UrlModel } from '@/models/Url'
import { UserModel } from '@/models/User'
import { getI18nKeyboard } from '@/helpers/bot'
import { getNewUrl } from '@/models/Url'
import Context from '@/models/Context'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'

export async function handleNext(ctx: Context) {
  if (!isTrial(ctx)) {
    await ctx.replyWithLocalization('trial_end', {
      ...sendOptions(ctx),
      reply_markup: instructionMenu,
    })
  } else {
    ctx.dbuser.trialCount = ctx.dbuser.trialCount - 1
    await ctx.dbuser.save()
    await sendFolder(ctx)
  }
}

export async function sendFolder(ctx: Context) {
  const urlObjectID = await getNewUrl(ctx.dbuser)
  if (urlObjectID) {
    const url = await UrlModel.findById(urlObjectID._id)
    if (url!.user) {
      const user = await UserModel.findById(url!.user)
      const urlID: ObjectId = url!._id
      ctx.dbuser.receivedUrlsID?.push(urlID)
      await ctx.dbuser.save()
      await ctx.replyWithLocalization('send_url', {
        ...sendOptions(ctx, {
          author: '@' + user!.username,
          categories: url!.categories.join(', '),
          url: url!.url,
        }),
        reply_markup: getI18nKeyboard(ctx.dbuser.language, 'NextChange'),
      })
    } else {
      const urlID: ObjectId = url!._id
      ctx.dbuser.receivedUrlsID?.push(urlID)
      await ctx.dbuser.save()
      await ctx.replyWithLocalization('send_url', {
        ...sendOptions(ctx, {
          author: 'remained anonymous',
          categories: url!.categories.join(', '),
          url: url!.url,
        }),
        reply_markup: getI18nKeyboard(ctx.dbuser.language, 'NextChange'),
      })
    }
  } else {
    if (isTrial(ctx)) {
      ctx.dbuser.trialCount = ctx.dbuser.trialCount + 1
    }
    await ctx.dbuser.save()

    await ctx.replyWithLocalization('end', sendOptions(ctx))
  }
}

export function isTrial(ctx: Context) {
  return ctx.dbuser.trialCount != 0
}
