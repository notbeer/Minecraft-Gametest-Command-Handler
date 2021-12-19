import CommandInputOption from './CommandInputBuilder';
import { validateString } from '../../utils/validator';
export default class CommandBuilderGroup {
    constructor() {
        this.aliases = [];
        this.inputs = [];
    }
    setName(value) {
        validateString(value, true);
        this.name = value;
        return this;
    }
    ;
    setAliases(value) {
        typeof value === 'string'
            ? this.aliases.push(value)
            : this.aliases = value;
        return this;
    }
    ;
    setDescription(value) {
        validateString(value);
        this.description = value;
        return this;
    }
    ;
    addInput(option) {
        this.inputs.push(typeof option === 'function' ? option(new CommandInputOption()) : option);
        return this;
    }
    ;
    toJSON() {
        return {
            name: this.name,
            ...(this.aliases.length ? true : false) && { aliases: this.aliases },
            description: this.description ? this.description : 'No description found',
            ...(this.inputs.length ? true : false) && { inputs: this.inputs }
        };
    }
    ;
}
;
