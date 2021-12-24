import CommandInputsParser from './input.js'

export default class CommandGroupsParser {
  constructor({ groups, args }) {
    this.groups = groups
    this.args = args
  }
  
  toParsedGroups() {
    const groups = this.command.groups
    const ParsedGroups = []
    
    groups.forEach(group => ParsedGroups.push({ ...group, ranByPlayer: this.args[0] === group.name }))
    
    for(const ParsedGroup of ParsedGroups) {
      const GroupInputs = ParsedGroup.inputs
      const ParsedGroupInputs = []
      
      if(!ParsedGroupInputs) continue;
      
      for(const GroupInput of GroupInputs) {
        a
      }
    }
               
    return ParsedGroups
  }
}
