import CommandInputsParser from './input.js'

export default class CommandGroupsParser {
  constructor({ groups, args }) {
    this.groups = groups
    this.args = args
  }
  
  toParsedGroups() {
    const groups = this.groups
    let ParsedGroups = []
    
    groups.forEach(group => ParsedGroups.push({ ...group, ranByPlayer: this.args[0] === group.name || group.aliases.includes(this.args[0]) }))
    
    for(const ParsedGroup of ParsedGroups) {
      const GroupIndex = ParsedGroups.indexOf(ParsedGroup)
      const GroupInputs = ParsedGroup.inputs
      if(!GroupInputs || !ParsedGroup.ranByPlayer) continue;
      
      this.args.splice(0, 1)
      let ParsedGroupInputs = new CommandInputsParser({ inputs: GroupInputs, args: this.args }).toParsedInputs()
      ParsedGroups[GroupIndex].inputs = ParsedGroupInputs
    }
               
    return ParsedGroups
  }
}
