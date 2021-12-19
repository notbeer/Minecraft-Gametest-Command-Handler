export interface Group {
    name: string,
    aliases: Array<string>,
    description: string,
    options: Array<Input>
}

export type inputType = 'string' | 'boolean' | 'int' | 'int8' | 'int16' | 'int32' | 'int64' | 'uint' | 'uint8' | 'uint16' | 'uint32' | 'uint64' | 'float32' | 'float64';
export interface Input {
    required: boolean,
    type: inputType,
    name: string,
    description: string
}

export interface CustomCommandRegistration {
    private?: boolean,
    cancelMessage?: boolean,
    name: string,
    description?: string,
    aliases?: Array<string>,
    usage?: Array<string>,
    example?: Array<string>,
    cooldown?: string | number,
    options: Array<Input>,
    groups: Array<Group>
}
export interface StoredCustomCommandRegistration extends CustomCommandRegistration {
    callback: (data: any, args: Array<string>) => void
}