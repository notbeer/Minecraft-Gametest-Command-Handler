
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
  const newPrefix = interaction.command.getGroup('set').getInput('new prefix')?.getValue()
  
  switch(!!newPrefix) {
    case true:
      CommandHandler.setPrefix(newPrefix)
      Commands.run(`tellraw ${interaction.player.nameTag} ${JSON.stringify({ rawtext: [ { text: 'prefix has been changed to' + newPrefix }]})}`, World.getDimension('overworld'))
      break;
    case false:
      Commands.run(`tellraw ${interaction.player.nameTag} ${JSON.stringify({ rawtext: [ { text: 'the current prefix is' + CommandHandler.getPrefix() }]})}`, World.getDimension('overworld'))
      break;
    default:
      break;
  }
})
