import { Keyboard } from 'grammy'
import { Menu } from '@grammyjs/menu'
import Context from '@/models/Context'

export default function sendOptions(
  ctx: Context,
  keyboard?: Keyboard | Menu<Context>,
  data?: any
) {
  return {
    //reply_to_message_id: ctx.msg?.message_id,
    reply_markup: keyboard,
    data,
    parse_mode: 'Markdown' as const,
  }
}
