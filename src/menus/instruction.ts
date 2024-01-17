import { Menu } from '@grammyjs/menu'
import { getI18nKeyboard } from '@/helpers/bot'
import Context from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'

const getInstruction = async (ctx: Context) => {
  await ctx.editMessageText(ctx.i18n.t('send_news_feed'), {
    parse_mode: 'Markdown',
    reply_markup: undefined,
  })

  await ctx.replyWithLocalization('instruction', {
    ...sendOptions(ctx),
    reply_markup: getI18nKeyboard(ctx.dbuser.language, 'Next'),
    parse_mode: 'HTML'
  })
}

const instructionMenu = new Menu<Context>('instruction')

instructionMenu.text('instruction', getInstruction)

export default instructionMenu
