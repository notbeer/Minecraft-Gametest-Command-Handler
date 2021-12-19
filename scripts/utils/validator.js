export function validateBoolean(value) {
    if (typeof value !== 'boolean')
        throw new Error('Value must be a boolean.');
}
;
export function validateString(value, regex) {
    if (typeof value !== 'string')
        throw new Error('Value must be a string.');
    if (regex && !/^[^A-Z\s]+$/.test(value))
        throw new Error('Value does NOT match the expression "/^[^A-Z]+$/".');
}
;
