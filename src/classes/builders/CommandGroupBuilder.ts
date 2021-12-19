import CommandInputOption from './CommandInputBuilder';
import { validateString } from '../../utils/validator';

import { Input } from '../../@types';

export default class CommandBuilderGroup {
    public name: string;
    public aliases: Array<string> = [];
    public description: string;
    public inputs: Array<Input> = [];

    public setName(value: string): CommandBuilderGroup {
        validateString(value, true);
        
        this.name = value;
        return this;
    };
    public setAliases(value: string | Array<string>): CommandBuilderGroup {
        typeof value === 'string' 
        ? this.aliases.push(value)
        : this.aliases = value;
        return this;
    };
    public setDescription(value: string): CommandBuilderGroup {
        validateString(value);

        this.description = value;
        return this;
    };
    public addInput(option: CommandInputOption | ((group: CommandInputOption) => CommandInputOption)): CommandBuilderGroup {
        this.inputs.push(typeof option === 'function' ? option(new CommandInputOption()) : option);
		return this;
    };
    public toJSON() {
        return {
            name: this.name,
            ...(this.aliases.length ? true : false) && { aliases: this.aliases },
            description: this.description ? this.description : 'No description found',
            ...(this.inputs.length ? true : false) && { inputs: this.inputs }
        };
    };
};