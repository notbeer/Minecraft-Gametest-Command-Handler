import CommandBuilder from "./classes/builders/CommandBuilder";
const register = new CommandBuilder()
    .setCancelMessage(true)
    .setName('help')
    .setAliases(['h'])
    .setDescription('get help!')
    .setUsage(['help', 'help <command name>'])
    .addInput(input => input.setName('command name').setDescription('name of command you need help on').setType('string'))

<comamd smt>.register(register, (interaction) => {
  const commandName = interaction.command.getInput('command name')
  if(!commandName) //send msg
  //retrive info for command etc
})
