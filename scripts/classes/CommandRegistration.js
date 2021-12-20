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
    const groups = command?.groups
    const groupInput = args.shift()
    
    let parsedGroups = []
    groups?.forEach(group => {
      const commandRan = group?.name === groupInput
      parsedGroups.push({ ...group, ran: commandRan })
    })
    
    parsedGroups?.forEach(parsedGroup => {
      const index = parsedGroups?.indexOf(parsedGroup)
      const options = parsedGroup?.inputs
      const parsedOptions = []
      options?.forEach(option => {
        let index1 = options?.indexOf(option)
        let value = args?.length >= index1 ? args[index1] : undefined
        
        /*if(option?.required && !value)
           return new commandError({ message: `input for ${option?.name} at group ${parsedGroup?.name} is required!`, player: this.player, command: this.command })
        
        parsedOptions.push({ ...option, value })
      })
     
      parsedGroups[index].inputs = parsedOptions
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
