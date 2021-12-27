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
  return input.setName('command').setType('string').setDescription('command name you need help on!')
})

CommandHandler.register(registration, (interaction) => {
  try {
    const playerInput = interaction.command.getInput('command')?.getValue()
    
    let message = `Command Prefix: ${CommandHandler.getPrefix()}\n`
    switch (!!playerInput) {
      case true:
        const command = CommandHandler.getCommand(playerInput)
        message += !command || command?.private ? `§c${playerInput} was not found...` : `${command.name}:\n description: ${command.description}\n usage: ${command.usages ? command.usages : 'no usages were found' }\n aliases: ${command.aliases ? command.aliases : 'no aliases were found' }\n cooldown: ${command.cooldown ? command.cooldown : 'no cooldown was found' }`
        break;
      case false:
        const commands = CommandHandler.getAllCommands()
        for(const [key, command] of commands) {
          if(command.private) continue
          message += `${command.name}:\n description: ${command.description ? command.description : 'no description was found' }\n usage: ${command.usages ? command.usages : 'no usages were found' }\n aliases: ${command.aliases ? command.aliases : 'no aliases were found' }\n cooldown: ${command.cooldown ? command.cooldown : 'no cooldown was found' }\n\n`
        }
        break;
      default:
        break;
    }
    
    Commands.run(`tellraw "${interaction.player.nameTag}" ${JSON.stringify({ rawtext: [ { text: message } ] })}`, World.getDimension("overworld"))
  } catch(e) {
    Commands.run(`say ${e} ${e.stack}`, World.getDimension('overworld'))
  }
})
