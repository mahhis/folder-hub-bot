import { InlineKeyboard } from 'grammy'
import { Menu } from '@grammyjs/menu'
import { Url } from '@/models/Url'
import { cwd } from 'process'
import { load } from 'js-yaml'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

interface YamlWithName {
  name: string
}

const localeFilePaths = readdirSync(resolve(cwd(), 'locales'))

const localeFile = (path: string) => {
  return load(
    readFileSync(resolve(cwd(), 'locales', path), 'utf8')
  ) as YamlWithName
}

const setLanguage = (languageCode: string) => async (ctx: Context) => {
  ctx.dbuser.language = languageCode
  await ctx.dbuser.save()
  ctx.i18n.locale(languageCode)
  return ctx.editMessageText(ctx.i18n.t('language_selected'), {
    parse_mode: 'HTML',
    reply_markup: undefined,
  })
}

const categoryNames = [
  'Category1',
  'Category2',
  'Category3',
  'Category4',
  'Finish',
]

const categoriesMenu = new Menu<Context>('category')

const IcategoriesMenu = new InlineKeyboard()

export async function getCategoriesMenu(
  url: any,
  selectedCategory?: string
): Promise<InlineKeyboard> {
  // const categoriesMenu1 = new Menu<Context>('ategory1')

  if (selectedCategory) {
    url.categories.push(selectedCategory)
    await url.save()
  }

  categoryNames.forEach((category, index) => {
    if (url.categories.includes(category)) {
      console.log(123)
      IcategoriesMenu.text('✅' + category, setCategory(url, category))
    } else {
      console.log(1)
      IcategoriesMenu.text(category,  setCategory(url, category))
      console.log(categoriesMenu)
    }
    if (index % 3 === 0) {
      IcategoriesMenu.row()
    }
  })

  //console.log(categoryMenu)

  return IcategoriesMenu
}

const setCategory = (category: string, url: any) => async (ctx: Context) => {
  // Add logic to handle category selection here
  // For example, you can update the user's selected category in the database
  // and then display an "okay" emoticon next to the selected category
  const categoriesMenu = await getCategoriesMenu(url, category)
  console.log(categoriesMenu)
  return await ctx.editMessageText(ctx.i18n.t('select_category'), {
    ...sendOptions(ctx),
    reply_markup: categoriesMenu,
  })
}

export default IcategoriesMenu

// const categoryMenu = new Menu<Context>('category')

// categoryNames.forEach((category, index) => {
//   categoryMenu.text(category, setCategory(category))
//   if (index % 3 === 0) {
//     categoryMenu.row()
//   }
// })

// // function getCategoriesMenu( numberSelectedCategory?: number ){

// // }

// // Add your category names to this array
