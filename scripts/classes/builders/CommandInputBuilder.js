import { validateBoolean, validateString } from '../../utils/validator';
const inputTypeOpt = ['string', 'boolean', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'float32', 'float64'];
export default class CommandInputOption {
    setRequired(value) {
        validateBoolean(value);
        this.required = value;
        return this;
    }
    ;
    setType(value) {
        if (!inputTypeOpt.includes(value.toLowerCase()))
            throw new Error(`Value must be a ${inputTypeOpt.join(', ').replace(/, ([^,]*)$/, ' or $1')}.`);
        this.type = value;
        return this;
    }
    ;
    setName(value) {
        validateString(value, true);
        this.name = value;
        return this;
    }
    ;
    setDescription(value) {
        validateString(value, false);
        this.description = value;
        return this;
    }
    ;
    toJSON() {
        return {
            required: this.required ? true : false,
            type: this.type,
            description: this.description ? this.description : 'No description found'
        };
    }
    ;
}
;
