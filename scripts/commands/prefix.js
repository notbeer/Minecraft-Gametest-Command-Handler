
import { World, Commands } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"

const registration = new CommandBuilder()
.setName('prefix')
.setAliases(['p'])
.setDescription('manage the command prefix!')
.setUsage(['prefix', 'prefix set <new prefix: string>'])
.setCancelMessage(true)
.setPrivate(false)
.addGroup(group => {
  return group.setName('set').setAliases(['change']).setDescription('change the prefix').addInput(input => {
    return input.setRequired(true).setType('string').setName('new prefix')
  })
})

CommandHandler.register(registration, (interaction) => {
})
