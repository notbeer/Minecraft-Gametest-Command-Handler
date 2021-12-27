import CommandInputBuilder from './CommandInputBuilder.js';
import CommandGroupBuilder from './CommandGroupBuilder.js';
import { validateBoolean, validateString } from '../../utils/validator.js';
export default class CommandBuilder {
    constructor() {
        this.aliases = [];
        this.usages = [];
        this.inputs = [];
        this.groups = [];
        this.requiredTags = []
        this.cancelMessage = false
        this.private = false
    }
    setPrivate(value) {
        validateBoolean(value);
        this.private = value;
        return this;
    }
    ;
    setCancelMessage(value) {
        validateBoolean(value);
        this.cancelMessage = value;
        return this;
    }
    ;
    
    setRequiredTags(value) {
        this.requiredTags = [...value]
    }
    
    setName(value) {
        validateString(value, true);
        this.name = value;
        return this;
    }
    ;
    setDescription(value) {
        validateString(value);
        this.description = value;
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
    setUsage(value) {
        typeof value === 'string'
            ? this.usages.push(value)
            : this.usages = value;
        return this;
    }
    ;
    setCooldown(value) {
        if (typeof value !== 'string')
            throw new Error('Value must be a string.');
        this.cooldown = value;
        return this;
    }
    ;
    addInput(option) {
        const result = typeof option === 'function' ? option(new CommandInputBuilder()) : option;
        if (this.inputs.some(elm => elm.name === result.name))
            throw new Error(`Group under the name "${result.name}" already exists.`);
        this.inputs.push(result);
        this.inputs.sort((a, b) => {
          if(a.required === true) return -1
        })
        return this;
    }
    ;
    addGroup(option) {
        const result = typeof option === 'function' ? option(new CommandGroupBuilder()) : option;
        if (this.groups.some(elm => elm.name === result.name))
            throw new Error(`Group under the name "${result.name}" already exists.`);
        this.groups.push(result);
        return this;
    }
    ;
    toJSON() {
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
    }
    ;
}
;
