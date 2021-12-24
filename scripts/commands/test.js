import { World, Commands } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"

const registration = new CommandBuilder()
.setName('test')
.setAliases(['t'])
.setDescription('testing to see if the command handler works!')
.setUsage(['this is a test!'])
.setCancelMessage(false)
.addInput(input => {
  input.setName('test1').setRequired(true).setType('string')
})
.addGroup(group => {
  group.setName('test2')
  .addInput(input => {
    input.setName('test21').setRequired(true).setType('any')
  })
})

CommandHandler.register(registration, (interaction) => {
  const input = interaction.command.getInput('test1')
  Commands.run("say this actually works! wow! input value" + input, World.getDimension("overworld"))
})
