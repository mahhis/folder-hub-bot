import { InlineKeyboard } from 'grammy'
import { findLastAddedUrl } from '@/models/Url'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import i18n from '@/helpers/i18n'
import sendOptions from '@/helpers/sendOptions'
import { isTrial, sendFolder } from '@/handlers/next'
import instructionMenu from '@/menus/instruction'

function getI18nCategoryNames(lng: string) {
  const categoriesString = i18n.t(lng, 'categories')
  const categoryNames = categoriesString
    .split('\n')
    .map((category) => category.trim())
    .filter(Boolean)
  return categoryNames
}

export function createCategoriesMenu(ctx: Context): InlineKeyboard {
  const categoryNames = getI18nCategoryNames(ctx.dbuser.language)
  const categoryNamesEnglish = getI18nCategoryNames('en')

  const categoriesMenu = new InlineKeyboard()
  categoryNames.forEach((category, index) => {
    categoriesMenu.text(category, categoryNamesEnglish[index])
    if ((index + 1) % 3 === 0) {
      categoriesMenu.row()
    }
  })
  return categoriesMenu
}

// Function to get the categories menu
export async function getCategoriesMenu(ctx: Context) {
  const categoryNames = getI18nCategoryNames(ctx.dbuser.language)
  const categoryNamesEnglish = getI18nCategoryNames('en')
  const categoriesMenu = new InlineKeyboard()

  const url = await findLastAddedUrl(ctx.dbuser)
  const selectedCategory = ctx.callbackQuery?.data

  if (selectedCategory == '❗️Finish❗️') {
    ctx.dbuser.step = 'confirmation'
    await ctx.dbuser.save()

    await ctx.editMessageText(ctx.i18n.t('recorded'), {
      ...sendOptions(ctx),
      reply_markup: undefined,
    })

    await ctx.replyWithLocalization('confirmation', {
      ...sendOptions(ctx),
      reply_markup: getI18nKeyboard(ctx.dbuser.language, 'YesNo'),
    })
    return
  }

  if (selectedCategory && !url!.categories.includes(selectedCategory!)) {
    url!.categories.push(selectedCategory)
    await url!.save()
  } else if (url!.categories.includes(selectedCategory!)) {
    url!.categories = url!.categories.filter(
      (category) => category !== selectedCategory!
    )
    await url!.save()
  }

  categoryNames.forEach((category, index) => {
    if (url!.categories.includes(categoryNamesEnglish[index])) {
      categoriesMenu.text('✅' + category, categoryNamesEnglish[index])
    } else {
      categoriesMenu.text(category, categoryNamesEnglish[index])
    }
    if ((index + 1) % 3 === 0) {
      categoriesMenu.row()
    }
  })

  await ctx.editMessageText(ctx.i18n.t('select_category_url'), {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}

export async function saveCategoriesForUserStream(ctx: Context) {
  const categoryNames = getI18nCategoryNames(ctx.dbuser.language)
  const categoryNamesEnglish = getI18nCategoryNames('en')
  const categoriesMenu = new InlineKeyboard()

  const selectedCategory = ctx.callbackQuery?.data
  const user = ctx.dbuser

  if (selectedCategory == '❗️Finish❗️') {

    let userCategories = ctx.dbuser.currentCategorySelection.join(', ')

    await ctx.deleteMessage()
    if(userCategories.length == 0){
      await ctx.replyWithLocalization('choice_made_random', {
        ...sendOptions(ctx),
        reply_markup: undefined,
      })
    } else {
      await ctx.replyWithLocalization('choice_made', {
        ...sendOptions(ctx, { categories: userCategories }),
        reply_markup: undefined,
      })
    }
    
    if(!isTrial(ctx)){
      await ctx.replyWithLocalization(
          'trial_end', {
          ...sendOptions(ctx),
          reply_markup: instructionMenu 
          }
          )
    } else {
      ctx.dbuser.trialCount = ctx.dbuser.trialCount - 1
      await ctx.dbuser.save()
      await sendFolder(ctx)
    }
    return
  }

  if (selectedCategory && !user!.currentCategorySelection.includes(selectedCategory!)) {
    user!.currentCategorySelection.push(selectedCategory)
    await user.save()
  } else if (user!.currentCategorySelection.includes(selectedCategory!)) {
    user!.currentCategorySelection = user!.currentCategorySelection.filter(
      (category) => category !== selectedCategory!
    )
    await user.save()
  }

  categoryNames.forEach((category, index) => {
    if (user!.currentCategorySelection.includes(categoryNamesEnglish[index])) {
      categoriesMenu.text('✅' + category, categoryNamesEnglish[index])
    } else {
      categoriesMenu.text(category, categoryNamesEnglish[index])
    }
    if ((index + 1) % 3 === 0) {
      categoriesMenu.row()
    }
  })

  await ctx.editMessageText(ctx.i18n.t('select_category_stream'), {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}

