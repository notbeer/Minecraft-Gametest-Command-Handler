import { World } from 'mojang-minecraft'
import Collection from './include/Collection.js';
import event from './manager/EventEmitter.js'
import CommandError from './error/command.js';
import Interaction from './interaction/interaction.js';
import CommandParser from './parser/command.js'
import { setTickTimeout } from '../utils/scheduling.js';

class CustomCommand {
    constructor() {
        this.prefix = "+";
        this.cooldowns = new Map();
        this.commands = new Collection();
        event.on('beforeChat', beforeChatPacket => this.exec(beforeChatPacket))
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
            return new CommandError({ message: `${commandName} is an invalid command! Use the help command to get a list of all the commands.`, player: player.nameTag, });
        if(command.requiredTags.length && !player.hasAllTags(command.requiredTags))
            return new CommandError({ message: `you do not have the required permissions to use ${commandName}! you must have all of these tags to execute the command: ${command.requiredTags}`, player: player.nameTag, })
        
        if(!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());
        const now = Date.now();
        const timestamps = this.cooldowns.get(command.name);
        const cooldownAmount = MS(command.cooldown || '0');

        if(timestamps.has(player.nameTag)) {
            const expirationTime = timestamps.get(player.nameTag) + cooldownAmount;
            if(now < expirationTime) {
                const timeLeft = expirationTime - now;
                return new CommandError({ message: `Please wait ${MS(timeLeft)} before reusing the "${commandName}" command.`, player: player.nameTag });
            };
        };
        timestamps.set(player.nameTag, now);
        setTickTimeout(() => timestamps.delete(player.nameTag), Math.floor(cooldownAmount / 1000 * 20));
        
        beforeChatPacket.cancel = command.cancelMessage
        
        let ParsedCommand;
        try {
            ParsedCommand = new CommandParser({ command, args }).toParsedCommand()
        }  catch(e) {
            new CommandError({ message: e.message, player: player.nameTag })
            return;
        }
        
        const interaction = new Interaction(ParsedCommand, player, message, args)
        event.emit('commandRan', interaction)
        
        command.callback(interaction);
    };
};

const CommandHandler = new CustomCommand()
export default CommandHandler 
