import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { bot } from '@/helpers/bot'
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { run } from '@grammyjs/runner'
import IcategoriesMenu from '@/menus/categories'
import attachUser from '@/middlewares/attachUser'
import configureI18n from '@/middlewares/configureI18n'
import handleLanguage from '@/handlers/language'
import handleStart from '@/handlers/start'
import i18n from '@/helpers/i18n'
import instructionMenu from '@/menus/instruction'
import languageMenu from '@/menus/language'
import selectStep from '@/handlers/selectStep'
import sendHelp from '@/handlers/help'
import startMongo from '@/helpers/startMongo'

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('Mongo connected')
  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    // Menus
    .use(languageMenu)
    .use(instructionMenu)
  //.use(IcategoriesMenu)
  // Commands
  bot.command('help', sendHelp)
  bot.command('start', handleStart)
  bot.command('language', handleLanguage)

  bot.on('message', selectStep)
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot ${bot.botInfo.username} is up and running`)
}

void runApp()
