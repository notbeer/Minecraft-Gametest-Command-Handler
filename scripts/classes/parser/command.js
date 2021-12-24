import CommandGroupsParser from './group.js'
import CommandInputsParser from './input.js'

export default class CommandParser {
  constructor({ command, args }) {
    this.command = command
    this.args = args
  }
  
  toParsedCommand() {
    const ParsedGroups = new CommandGroupParser({ groups: this.command.groups }).toParsedGroups()
    const ParsedInputs = new CommandInputParser({ inputs: this.command.inputs }).toParsedInputs()
    const ParsedCommand = { ...this.command, inputs: ParsedInputs, groups: ParsedGroups }  
    
    return ParsedCommand
  }
}
