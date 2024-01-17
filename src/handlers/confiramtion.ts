import { ObjectId } from 'mongodb'
import { findLastAddedUrl } from '@/models/Url'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import { type Message } from "@grammyjs/types"


const snacks = [
  '\u{1F354}', //Hamburger:
  '\u{1F354}', //Pizza
  '\u{1F363}', //Sushi
  '\u{1F366}', //Ice Cream
  '\u{1F353}', //Strawberry
  '\u{1F34E}', //Red Apple
  '\u{1F347}', //Grapes
  '\u{1F349}', //Watermelon
  '\u{1F34D}', //Pineapple
  '\u{1F351}', //Peach
]

export default async function handleConfirmation(ctx: Context, message: Message) {
  const lastUrl = await findLastAddedUrl(ctx.dbuser)
  const lastUrlID: ObjectId = lastUrl!._id
  if (message.text === 'No') {
    lastUrl!.user = undefined
    await lastUrl!.save()
  }

  await ctx.replyWithLocalization('gratitude', sendOptions(ctx))
  const snack = getRandomEmoji()
  await ctx.replyWithLocalization('snack', {
    ...sendOptions(ctx, snack),
    reply_markup: getI18nKeyboard(ctx.dbuser.language, 'NextChange'),
  })

  ctx.dbuser.step = 'alredy_shared'
  ctx.dbuser.trialCount = -4
  ctx.dbuser.receivedUrlsID?.push(lastUrlID)
  await ctx.dbuser.save()
}

function getRandomEmoji(): string {
  const randomIndex = Math.floor(Math.random() * snacks.length)
  return snacks[randomIndex]
}
