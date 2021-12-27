import { World, Commands } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"

const registration = new CommandBuilder()
.setName('test')
.setAliases(['t'])
.setDescription('testing to see if the command handler works!')
.setUsage(['this is a test!'])
.setCooldown('20 seconds')
.setCancelMessage(false)
.setPrivate(true)
.setRequiredTags(['ree'])
.addInput(input => {
  return input.setName('test1').setRequired(true).setType('player')
})
.addGroup(group => {
  return group.setName('test2')
  .addInput(input => {
    return input.setName('test21').setRequired(true).setType('any')
  })
})

CommandHandler.register(registration, (interaction) => {
  const input = interaction.command?.getInput('test1')?.getValue()?.nameTag
  const groupInput = interaction.command?.getGroup('test2')?.getInput('test21')?.getValue()
  Commands.run(`say :\ninput test1: ${input}\ninputGroup: ${groupInput}`, World.getDimension("overworld"))
})
