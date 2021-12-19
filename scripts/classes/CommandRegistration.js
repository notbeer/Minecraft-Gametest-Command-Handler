import Collection from "./include/Collection";
export default class CustomCommand {
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
    exec(value) {
        if (!value.startsWith(this.prefix))
            return;
        const args = value.slice(this.prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();
        const data = this._get(command);
        if (!data)
            return console.log('Command no found');
        const group = data.groups.filter(elm => elm.name.toLowerCase() === args[0]?.toLowerCase());
        if (!group.length)
            return console.log(`No group named "${args[0]}" exist!`);
        data.callback(command, args);
    }
    ;
}
;
