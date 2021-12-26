import { World } from 'mojang-minecraft'
import player from '../utils/player.js'
import Collection from './include/Collection.js';
import event from './manager/EventEmitter.js'
import CommandError from './error/command.js';
import Interaction from './interaction/interaction.js';
import CommandParser from './parser/command.js'

class CustomCommand {
    constructor() {
        this.prefix = "+";
        this.cooldown = new Map();
        this.commands = new Collection();
        World.events.beforeChat.subscribe(beforeChatPacket => this.exec(beforeChatPacket))
    };
    
    getCommand(command) {
        const cmd = command.toLowerCase();
        return this.commands.get(cmd) || this.commands.find(v => v.aliases?.includes(cmd));
    };
    
    getAllCommands() {
        return this.commands
    }
    
    getPrefix() {
        return this.prefix
    }
    
    setPrefix(value) {
        this.prefix = value
    }
    
    register(registration, callback) {
        this.commands.set(registration.name.toLowerCase(), {
            ...registration,
            callback
        });
    };
    
    triggerCommand(command, interaction) {
        this.getCommand(command).callBack(interaction)
    }
    
    
    exec(beforeChatPacket) {
        let { message, sender: player } = beforeChatPacket
        if (!message.startsWith(this.prefix))
            return;
        
        beforeChatPacket.cancel = true
        const args = message.slice(this.prefix.length).trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
        
        const commandName = args.shift().toLowerCase();
        const command = this.getCommand(commandName);
        if (!command || command.private && !player.hasTag({ name: player.nameTag, tag: 'private' }))
            return new CommandError({ message: `${commandName} is an invalid command! Use the help command to get a list of all the commands.`, player, });
        if(command.requiredTags.length && !command.requiredTags.every(requiredTag => player.tags.includes(requiredTag)))
            return new CommandError({ message: `you do not have the required permissions to use ${commandName}! you must have all of these tags to execute the command: ${command.requiredTags}`, player, })
        
        
        beforeChatPacket.cancel = command.cancelMessage
        
        let ParsedCommand;
        try {
            ParsedCommand = new CommandParser({ command, args }).toParsedCommand()
        }  catch(e) {
            new CommandError({ message: e.message, player })
            return;
        }
        
        const interaction = new Interaction(ParsedCommand, player, message, args)
        event.emit('commandRan', interaction)
        
        command.callback(interaction);
    };
};

const CommandHandler = new CustomCommand()
export default CommandHandler 
