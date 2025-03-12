import { type Message } from '@grammyjs/types'
import { createCategoriesMenu } from '@/menus/categories'
import { findOrCreateUrl, isURL } from '@/models/Url'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

export default async function handleUrl(ctx: Context, message: Message) {
  await findOrCreateUrl(message.text!, ctx.dbuser)
  ctx.dbuser.step = 'select_category_url'
  await ctx.dbuser.save()

  const categoriesMenu = await createCategoriesMenu(ctx)

  await ctx.replyWithLocalization('select_category_url', {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}
