import Collection from './include/Collection.js';
import commandError from '../utils/commandError.js';

class CustomCommand {
    constructor() {
        this.prefix = "+";
        this.cooldown = new Map();
        this.commands = new Collection();
    }
    _get(command) {
        const cmd = command.toLowerCase();
        //return this.commands.find(elm => elm?.name === cmd || elm.aliases?.includes(cmd));
        return this.commands.get(cmd) || this.commands.find(v => v.aliases?.includes(cmd));
    }
    ;
    register(registration, callback) {
        this.commands.set(registration.name.toLowerCase(), {
            ...registration,
            callback
        });
    }
    ;
    exec(beforeChatPacket) {
        let { message, sender: player } = beforeChatPacket
        if (!message.startsWith(this.prefix))
            return;

        const args = message.slice(this.prefix.length).trim().match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g)
        //const args = message.slice(this.prefix.length).trim().split(/\s+/);
        
        const command = args.shift().toLowerCase();
        const data = this._get(command);
        if (!data)
            return new commandError({ 
                message: `${command} is an invalid command! Use the help command to get a list of all the commands.`,
                player,
            });
        
     
        const group = data.groups.filter(elm => elm.name.toLowerCase() === args[0]?.toLowerCase());
        if (!group.length)
            return console.log(`No group named "${args[0]}" exist!`);
        data.callback(command, args);
    }
    ;
}
;

export default const CommandHandler = new CustomCommand()