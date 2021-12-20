import Collection from './include/Collection.js';
import commandError from '../utils/commandError.js';
import commandParser from '../utils/commandParser.js';
import commandInteraction from './interaction/command.js';

class CustomCommand {
    constructor() {
        this.prefix = "+";
        this.cooldown = new Map();
        this.commands = new Collection();
    };
    
    _get(command) {
        const cmd = command.toLowerCase();
        //return this.commands.find(elm => elm?.name === cmd || elm.aliases?.includes(cmd));
        return this.commands.get(cmd) || this.commands.find(v => v.aliases?.includes(cmd));
    };
    
    register(registration, callback) {
        this.commands.set(registration.name.toLowerCase(), {
            ...registration,
            callback
        });
    };
    /*  
    parseGroups(command, args) {
      const groups = command.groups
      const groupInput = args.shift()
  
      let parsedGroups = []
      groups?.forEach(group => parsedGroups.push({ ...group, ran: group?.name === groupInput }))
  
      parsedGroups?.forEach(parsedGroup => {
        let groupIndex = parsedGroups.indexOf(parsedGroup)
        let inputs = parsedGroup?.inputs
        if(!inputs) return
    
        let parsedInputs = []
        inputs.forEach(input => {
          let inputIndex = inputs.indexOf(input)
          let playerInput = args[inputIndex] ?? undefined
      
          parsedInputs.push({ ...input, playerInput  })
      })
    
     parsedGroups[groupIndex].inputs = parsedInputs
   })
    
    return parsedGroups
  }
    */
    exec(beforeChatPacket) {
        let { message, sender: player } = beforeChatPacket
        if (!message.startsWith(this.prefix))
            return;

        const args = message.slice(this.prefix.length).trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
        //const args = message.slice(this.prefix.length).trim().split(/\s+/);
        
        const commandName = args.shift().toLowerCase();
        const command = this._get(commandName);
        if (!data)
            return new commandError({ 
                message: `${commandName} is an invalid command! Use the help command to get a list of all the commands.`,
                player,
            });
        
     
        const parsedCommand = new commandParser({ command, args, player })
        if(parsedCommand.error) return;
        
        const Interaction = new commandInteraction(command, player, message, args)
        //event.emit('commandRan', some sort of interaction whichwill contain the parsed command)
        
        data.callback(Interaction);
    };
};

export default const CommandHandler = new CustomCommand()
