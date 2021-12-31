import { World, Commands } from 'mojang-minecraft'
import Collection from './include/Collection.js';
import player from '../utils/player.js'
import event from './manager/EventEmitter.js'
import CommandError from './error/command.js';
import Interaction from './interaction/interaction.js';
import CommandParser from './parser/command.js'
import database from '../utils/database.js'
import MS from '../utils/ms.js'
import { setTickTimeout } from '../utils/scheduling.js';

class CustomCommand {
    constructor() {
        this.prefix = "+";
        this.cooldowns = database.table('commandCooldowns')
        this.commands = new Collection();
        World.events.beforeChat.subscribe(beforeChatPacket => {
            this.exec(beforeChatPacket)
        })
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
        try {
        let { message, sender } = beforeChatPacket
        if (!message.startsWith(this.prefix))
            return;
        
        beforeChatPacket.cancel = true
        const args = message.slice(this.prefix.length).trim().match(/([^\s"]+|"[^"]*")+/g).map(v => /\s/.test(v) ? v.replace(/^"|"$/g, '') : v);
        
        const commandName = args?.shift()?.toLowerCase();
        const command = this.getCommand(commandName);
        if (!command || command.private && !player.hasTag({ tag: 'private', name: sender.nameTag }))
            return new CommandError({ message: `${commandName} is an invalid command! Use the help command to get a list of all the commands.`, player: sender.nameTag, });
        if(command.requiredTags.length && !player.hasAllTags({ tags: command.requiredTags, name: sender.nameTag }))
            return new CommandError({ message: `you do not have the required permissions to use ${commandName}! you must have all of these tags to execute the command: ${command.requiredTags}`, player: sender.nameTag, })
        
        beforeChatPacket.cancel = command.cancelMessage
        
        let ParsedCommand;
        try {
            ParsedCommand = new CommandParser({ command, args }).toParsedCommand()
        }  catch(e) {
            new CommandError({ message: e.message, player: sender.nameTag })
            return;
        }
        
        if(!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, []);
        const now = Date.now();
        let timestamps = this.cooldowns.get(command.name).value
        const cooldownAmount = MS(command.cooldown || '0');
        
        let timestamp = timestamps.find(elm => elm?.player == sender.nameTag)
        const expirationTime = timestamp ? timestamp?.cooldown + cooldownAmount : 0
        if(now < expirationTime) 
          return new CommandError({ message: `Please wait ${MS(expirationTime - now)} before reusing the "${commandName}" command.`, player: sender.nameTag });

        !!timestamp ? timestamps[timestamps.indexOf(timestamp)] = { ...timestamp, cooldown: now } : timestamps.push({ player: sender.nameTag, cooldown: now })
        
        this.cooldowns.update(command.name, timestamps)
            
        const interaction = new Interaction(ParsedCommand, sender, message, args)
        event.emit('commandRan', interaction)
        
        command.callback(interaction);
        } catch(e) {
            Commands.run(`say ${e} ${e.stack}`, World.getDimension('overworld'))
        }
    };
};

const CommandHandler = new CustomCommand()
export default CommandHandler 
