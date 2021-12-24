import CommandInputInteraction from './commandInput.js'
import CommndGroupInteraction from './commandGroup.js'

export default class CommandInteraction {
  constructor(command) {
    this.command = command
  }
  
  getName() {
    return this.command?.name
  }
  
  getDescription() {
    return this.command?.description
  }
  
  getAliases() {
    return this.command?.aliases
  }
  
  getUsage() {
    return this.command?.usages
  }
  
  getPrivate() {
    return this.command?.private
  }
  
  getCancelMessage() {
    return this.command?.cancelMessage
  }
  
  getCoolDown() {
    return this.command?.cooldown
  }
  
  getRequiredTags() {
    return this.command?.requiredTags
  }
  
  getInput(name) {
    const input = this.command?.inputs.find(input => input?.name == name)
    return new inputInteraction(input)
  }
  
  getInputs() {
    const data = this.command?.inputs
    const inputs = []
    data.forEach(input => inputs.push(new CommandInputInteraction(input)))
    return inputs
  }
  
  getRequiredInputs() {
    const data = this.command?.inputs.filter(input => input.required)
    const inputs = []
    data.forEach(requiredInput => inputs.push(new CommandInputInteraction(requiredInput)))
    return inputs
  }
  
  getFilledInputs() {
    const data = this.command?.inputs.filter(input => input.value != undefined)
    const inputs = []
    data.forEach(filledInput => inputs.push(new CommandInputInteraction(filledInput)))
    return inputs
  }
  
  getNonFilledInputs() {
    const data = this.command?.inputs.filter(input => input.value == undefined)
    const inputs = []
    data.forEach(nonFilledInput => inputs.push(new CommandInputInteraction(nonFilledInput)))
    return inputs
  }
  
  getGroup(name) {
    const group = this.command?.groups.find(group => group?.name == name)
    return new CommndGroupInteraction(group)
  }
  
  getGroups() {
    const data = this.command?.groups
    const groups = []
    data.forEach(group => groups.push(new CommndGroupInteraction(group)))
    return groups
  }
  
  getRanGroup() {
    const group = this.command?.groups.find(group => group.ran)
    return group
  }
  
  getNonRanGroups() {
    const data = this.command?.groups.filter(group => !group.ran)
    const groups = []
    data.forEach(group => groups.push(new CommndGroupInteraction(group)))
    return groups
  }
}
