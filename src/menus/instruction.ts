import { Menu } from '@grammyjs/menu'
import { cwd } from 'process'
import { getI18nKeyboard } from '@/helpers/bot'
import { load } from 'js-yaml'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const getInstruction = async (ctx: Context) => {
  await ctx.editMessageText(ctx.i18n.t('send_news_feed'), {
    parse_mode: 'Markdown',
    reply_markup: undefined,
  })

  await ctx.replyWithLocalization(
    'instruction',
    sendOptions(ctx, getI18nKeyboard(ctx.dbuser.language))
  )
}

const instructionMenu = new Menu<Context>('instruction')

instructionMenu.text('instruction', getInstruction)

export default instructionMenu
