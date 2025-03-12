import { Keyboard } from 'grammy'
import { createCategoriesMenu } from '@/menus/categories'
import { findOrCreateUser } from '@/models/User'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import i18n from '@/helpers/i18n'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'

export default async function handleChangeCategories(ctx: Context) {
  let userCategories = ctx.dbuser.currentCategorySelection.join(', ')
  if (userCategories.length == 0) {
    userCategories = i18n.t(ctx.dbuser.language, 'random_categories')
  }

  ctx.dbuser.step = 'stream_selection'
  ctx.dbuser.currentCategorySelection = []
  await ctx.dbuser.save()

  await ctx.replyWithLocalization(
    'before_categories',
    sendOptions(ctx, { categories: userCategories })
  )
  const categoriesMenu = await createCategoriesMenu(ctx)

  await ctx.replyWithLocalization('select_category_stream', {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}
