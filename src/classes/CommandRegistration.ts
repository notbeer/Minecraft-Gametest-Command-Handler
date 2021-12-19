import Collection from "./include/Collection";

import { StoredCustomCommandRegistration, CustomCommandRegistration } from "../@types";

export default class CustomCommand {
    public prefix: string = "+";
    public cooldown: Map<string, Map<string, number>> = new Map();
    public commands: Collection<string, StoredCustomCommandRegistration> = new Collection();

    private _get(command: string) {
        const cmd = command.toLowerCase();
        return this.commands.get(cmd) || this.commands.find(v => v.aliases?.includes(cmd)); 
    };

    public register(registration: CustomCommandRegistration, callback: (data: string, args: Array<string>) => void): void {
        this.commands.set(
            registration.name.toLowerCase(),
            {
                ...registration,
                callback
            }
        );
    };
    public exec(value: string) {
        if(!value.startsWith(this.prefix)) return;
        const args = value.slice(this.prefix.length).trim().split(/\s+/);
        const command = args.shift().toLowerCase();

        const data = this._get(command);
        if(!data) return console.log('Command no found');

        const group = data.groups.filter(elm => elm.name.toLowerCase() === args[0]?.toLowerCase());

        if(!group.length) return console.log(`No group named "${args[0]}" exist!`);

        data.callback(command, args);
    };
};