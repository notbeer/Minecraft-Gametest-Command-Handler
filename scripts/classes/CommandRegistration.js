import Collection from './include/Collection.js';
import EventEmitter from './manager/EventEmitter.js'
import CommandError from './error/command.js';
import CommandInteraction from './interaction/command.js';
import CommandParser from './parser/command.js'

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
    
    exec(beforeChatPacket) {
        let { message, sender: player } = beforeChatPacket
        if (!message.startsWith(this.prefix))
            return;
        
        beforeChatPacket.cancel = true
        const args = message.slice(this.prefix.length).trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
        //const args = message.slice(this.prefix.length).trim().split(/\s+/);
        
        const commandName = args.shift().toLowerCase();
        const command = this._get(commandName);
        if (!command)
            return new commandError({ 
                message: `${commandName} is an invalid command! Use the help command to get a list of all the commands.`,
                player,
            });
        
        beforeChatPacket.cancel = command.cancelMessage
        
        try {
            const ParsedCommand = new CommandParser({ command, args })
        }  catch(e) {
            new commandError({ message: e.message, player })
        }
        
        const Interaction = new commandInteraction(ParsedCommand, player, message, args)
        event.emit('commandRan', Interaction)
        
        data.callback(Interaction);
    };
};

const CommandHandler = new CustomCommand()
export default CommandHandler 
