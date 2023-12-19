import { findOrCreateUrl, isURL } from '@/models/Url'
import { getCategoriesMenu } from '@/menus/categories'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleUrl(ctx: Context) {
  const url = await findOrCreateUrl(
    ctx.msg!.text!,
    ctx.dbuser,
    ctx.msg!.message_id
  )
  ctx.dbuser.step = 'select_category'
  await ctx.dbuser.save()

  const categoriesMenu = await getCategoriesMenu(url)

  console.log(1234589)

  await ctx.replyWithLocalization('select_category', {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}

// export default async function handleUrl(ctx: Context) {
//   await findOrCreateUrl(ctx.msg!.text!, ctx.dbuser)
//   ctx.dbuser.step = 'confirmation'
//   await ctx.dbuser.save()

//   await ctx.replyWithLocalization('confirmation', {
//     ...sendOptions(ctx),
//     reply_markup: getI18nKeyboard(ctx.dbuser.language, 'YesNo'),
//   })
// }
