import Context from '@/models/Context'
import instructionMenu from '@/menus/instruction'
import sendOptions from '@/helpers/sendOptions'
import { type Message } from "@grammyjs/types"
import i18n from '@/helpers/i18n'
import { isTrial, sendFolder } from '@/handlers/next'
import { createCategoriesMenu } from '@/menus/categories'

export default async function handleStreamSelection(ctx: Context, message:Message) {

  ctx.dbuser.step = 'stream_selection'
  await ctx.dbuser.save()  

  if(!isTrial(ctx)){
    return await ctx.replyWithLocalization(
        'trial_end', {
        ...sendOptions(ctx),
        reply_markup: instructionMenu 
        }
        )
  }else {
   if(message.text == i18n.t(ctx.dbuser.language, 'random')){
    ctx.dbuser.currentCategorySelection = []
    await sendFolder(ctx)
   } else {
    const categoriesMenu = await createCategoriesMenu(ctx)
        await ctx.replyWithLocalization(
        'select_category_stream', {
        ...sendOptions(ctx),
        reply_markup: categoriesMenu 
        }
)
    }
}
}


