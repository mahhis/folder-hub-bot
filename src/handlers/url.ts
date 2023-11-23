import { TemplateData } from '@grammyjs/i18n'
import { Url, UrlModel, findOrCreateUrl } from '@/models/Url'
import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'

export async function getUrl(ctx: Context) {
  const url = ctx.msg!.text
  if (isURL(url!)) {
    await findOrCreateUrl(url!)
    ctx.dbuser.step = 'alredy_shared'
    await ctx.dbuser.save()
   // await getRandomUrl(ctx)
  } else {
    // URL is not valid or user is not in the expected step
    await ctx.replyWithLocalization(
      'send_news_feed',
      sendOptions(ctx, instructionMenu)
    )
  }
}

export async function getRandomUrl() {
  //try {

  const size = await UrlModel.countDocuments()
  console.log(size)
  const random = Math.floor(Math.random() * size)
  console.log(random)

  const t = await UrlModel.findOne().skip(random)
  console.log(t!.value)

  return t!.value

  // await UrlModel.count().exec(function (err, count) {
  //   const random = Math.floor(Math.random() * count)

  //  UrlModel.findOne()
  //     .skip(random)
  //     .exec(function (err, result) {
  //       //console.log(result?.value)
  //       return result?.value
  //     })
  // })

  // if (randomUrl) {
  //   return await ctx.replyWithLocalization(
  //     'send_url',
  //     sendOptions(ctx, undefined, { url: randomUrl[0].value })
  //   )
  // } else {
  //   console.log(123)
  // }

  //return { randomUrl: randomUrl[0] } // The result is an array, so we return the first element
  // } catch (error) {
  //   console.error('Error while fetching a random URL:', error)
  //   return null
  // }
}

export function isURL(text: string) {
  const urlPattern = /(https?:\/\/)?t\.me\/addlist\/[-\w]+/
  return urlPattern.test(text)
}
