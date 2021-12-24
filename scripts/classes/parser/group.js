import CommandInputsParser from './input.js'

export default class CommandGroupsParser {
  constructor({ groups, args }) {
    this.groups = groups
    this.args = args
  }
  
  toParsedGroups() {
    const groups = this.groups
    let ParsedGroups = []
    
    groups.forEach(group => ParsedGroups.push({ ...group, ranByPlayer: this.args[0] === group.name }))
    
    for(const ParsedGroup of ParsedGroups) {
      const GroupIndex = ParsedGroups.indexOf(ParsedGroup)
      const GroupInputs = ParsedGroup.inputs
      if(!GroupInputs || !ParsedGroup.ran) continue;
      
      this.args.shift()
      let ParsedGroupInputs = new CommandInputsParser({ inputs: GroupInputs, args: this.args })
      ParsedGroups[GroupIndex].inputs = ParsedGroupInputs
    }
               
    return ParsedGroups
  }
}
