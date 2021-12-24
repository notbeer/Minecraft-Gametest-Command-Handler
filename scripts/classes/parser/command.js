import CommandGroupsParser from './group.js'
import CommandInputsParser from './input.js'

export default class CommandParser {
  constructor({ command, args }) {
    this.command = command
    this.args = args
  }
  
  toParsedCommand() {
    const ParsedGroups = new CommandGroupsParser({ groups: this.command.groups, args: this.args }).toParsedGroups()
    const ParsedInputs = this.ranGroup() ? this.command.inputs : new CommandInputsParser({ inputs: this.command.inputs, args: this.args }).toParsedInputs()
    const ParsedCommand = { ...this.command, inputs: ParsedInputs, groups: ParsedGroups }  
    
    return ParsedCommand
  }
  
  ranGroup() {
    return this.command.groups.some(group => group.name == this.args[0] || group.aliases.includes(this.args[0]))
  }
}
