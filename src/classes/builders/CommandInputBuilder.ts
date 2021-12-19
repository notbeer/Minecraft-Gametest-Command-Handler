import { inputType } from '../../@types';
import { validateBoolean, validateString } from '../../utils/validator';

const inputTypeOpt = ['string', 'boolean', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64'];

export default class CommandInputOption {
    public required: boolean;
    public type: inputType;
    public name: string;
    public description: string;

    public setRequired(value: boolean): CommandInputOption {
        validateBoolean(value);

        this.required = value;
        return this;
    };
    public setType(value: inputType): CommandInputOption {
        if(!inputTypeOpt.includes(value.toLowerCase())) throw new Error(`Value must be a ${inputTypeOpt.join(', ').replace(/, ([^,]*)$/, ' or $1')}.`);

        this.type = value;
        return this;
    };
    public setName(value: string): CommandInputOption {
        validateString(value, true);

        this.name = value;
        return this;
    };
    public setDescription(value: string): CommandInputOption {
        validateString(value, false);

        this.description = value;
        return this;
    };
    public toJSON() {
        return {
            required: this.required ? true : false,
            type: this.type,
            description: this.description ? this.description : 'No description found'
        };
    };
};