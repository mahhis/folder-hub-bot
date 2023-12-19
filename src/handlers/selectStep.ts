import { findOrCreateUrl, isURL, isURLToFolder } from '@/models/Url'
import Context from '@/models/Context'
import handleConfirmation from '@/handlers/confiramtion'
import handleGive from '@/handlers/give'
import handleUrl from '@/handlers/url'
import sendOptions from '@/helpers/sendOptions'

const steps = ['confirmation']

export default async function selectStep(ctx: Context) {
  const message = ctx.msg!.text!

  if (ctx.dbuser.step === 'confirmation') {
    if (isYesOrNo(message)) {
      return await handleConfirmation(ctx)
    } else {
      return await ctx.replyWithLocalization('yes_no', sendOptions(ctx))
    }
  }
  if (isURL(message)) {
    if (isURLToFolder(message)) {
      return await handleUrl(ctx)
    } else {
      return await ctx.replyWithLocalization('broken_url', sendOptions(ctx))
    }
  }
  if (isGiveFolder(message)) {
    return await handleGive(ctx)
  }
}

function isGiveFolder(message: string) {
  return message === 'Give'
}

function isYesOrNo(message: string) {
  return message === 'Yes' || message === 'No'
}
