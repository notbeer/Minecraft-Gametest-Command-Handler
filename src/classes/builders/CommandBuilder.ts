import CommandInputOption from './CommandInputBuilder';
import CommandBuilderGroup from './CommandGroupBuilder';

import { Group, Input } from '../../@types';
import { validateBoolean, validateString } from '../../utils/validator';

export default class CommandBuilder {
    public private: boolean;
    public cancelMessage: boolean;
    public name: string;
    public description: string;
    public aliases: Array<string> = [];
    public usages: Array<string> = [];
    public cooldown: string | number;
    public inputs: Array<Input | any> = [];
    public groups: Array<Group | any> = [];

    public setPrivate(value: boolean): CommandBuilder {
        validateBoolean(value);

        this.private = value;
        return this;
    };
    public setCancelMessage(value: boolean): CommandBuilder {
        validateBoolean(value);

        this.cancelMessage = value;
        return this;
    };
    public setName(value: string): CommandBuilder {
        validateString(value, true);

        this.name = value;
        return this;
    };
    public setDescription(value: string): CommandBuilder {
        validateString(value);

        this.description = value;
        return this;
    };
    public setAliases(value: string | Array<string>): CommandBuilder {
        typeof value === 'string' 
        ? this.aliases.push(value)
        : this.aliases = value;
        return this;
    };
    public setUsage(value: string | Array<string>): CommandBuilder {
        typeof value === 'string' 
        ? this.usages.push(value)
        : this.usages = value;
        return this;
    };
    public setCooldown(value: string | number): CommandBuilder {
        if(typeof value === 'string' && typeof value === 'number') throw new Error('Value must be a string or number.');

        this.cooldown = value;
        return this;
    };
    public addInput(option: CommandInputOption | ((group: CommandInputOption) => CommandInputOption)): CommandBuilder {
        const result = typeof option === 'function' ? option(new CommandInputOption()) : option;

        if(this.inputs.some(elm => elm.name === result.name)) throw new Error(`Group under the name "${result.name}" already exists.`);

        this.inputs.push(result);
		return this;
    };
    public addGroup(option: CommandBuilderGroup | ((group: CommandBuilderGroup) => CommandBuilderGroup)): CommandBuilder {
        const result = typeof option === 'function' ? option(new CommandBuilderGroup()) : option;

        if(this.groups.some(elm => elm.name === result.name)) throw new Error(`Group under the name "${result.name}" already exists.`);

        this.groups.push(result);
		return this;
    };
    public toJSON() {
        return {
            private: this.private ? true : false,
            cancelMessage: this.cancelMessage ? true : false,
            name: this.name,
            description: this.description ? this.description : 'No description found',
            ...(this.aliases.length ? true : false) && { aliases: this.aliases },
            ...(this.usages.length ? true : false) && { usage: this.usages },
            cooldown: this.cooldown ? this.cooldown : 0,
            ...(this.inputs.length ? true : false) && { inputs: this.inputs.map(input => input.toJSON()) },
            ...(this.groups.length ? true : false) && { groups: this.groups.map(group => group.toJSON()) }
        };
    };
};