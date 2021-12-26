import { World, Commands } from "mojang-minecraft"
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"

const registration = new CommandBuilder()
.setName('help')
.setAliases(['h'])
.setDescription('get help on commands!')
.setUsage(['help', 'help <command>'])
.setCancelMessage(true)
.setPrivate(false)
.addInput(input => {
  return input.setName('command').setType('string').setDescription('command name you need help on!').setRequired(false)
})

CommandHandler.register(registration, (interaction) => {
  const playerInput = interaction.command.getInput('command')?.getValue()
  if(playerInput && !CommandHandler.getCommand(playerInput))
    return Commands.run(`tellraw "${interaction.player.nameTag}" ${JSON.stringify({ rawtext: [ { text: `${playerInput} was not found...` } ] })}`, World.getDimension('overworld'))
  
  const commands = playerInput ? CommandHandler.getCommand(playerInput) : CommandHandler.getAllCommands()
  let message = `CommandPrefix: ${CommandHandler.getPrefix()}\n`
  
  commands.forEach(command => {
    message += `${command.name}: ${JSON.stringify(command)}\n`
  })
  
  Commands.run(`tellraw "${interaction.player.nameTag}" ${JSON.stringify({ rawtext: [ { text: message } ] })}`, World.getDimension('overworld'))
  catch(e) {
    Commands.run(`say ${e} at ${e.stack}`, World.getDimension('overworld'))
  }
})
