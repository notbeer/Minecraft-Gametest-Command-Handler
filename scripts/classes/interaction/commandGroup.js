import CommandInputInteraction from './commandInput.js'

export default class CommandGroupInteraction {
  constructor(group) {
    this.group = group
  }
  
  getRan() {
    return this.group?.ranByPlayer
  }
  
  getName() {
    return this.group?.name
  }
  
  getDescription() {
    return this.group?.description
  }
  
  getAliases() {
    return this.group?.aliases
  }
  
  getUsages() {
    return this.group?.usages
  }
  
  getInput(name) {
    const input = this.group?.inputs?.find(option => option.name == name)
    return new CommandInputInteraction(input)
  }
  
  getInputs() {
    const data = this.group?.inputs
    const inputs = []
    data.forEach(input => inputs.push(new CommandInputInteraction(input)))
    return inputs
  }
  
  getRequiredInputs() {
    const data = this.group?.inputs.filter(input => input.required)
    const inputs = []
    data.forEach(requiredInput => inputs.push(new CommandInputInteraction(requiredInput)))
    return inputs
  }
  
  getFilledInputs() {
    const data = this.group?.inputs.filter(input => input.playerInput != undefined)
    const inputs = []
    data.forEach(filledInput => inputs.push(new CommandInputInteraction(filledInput)))
    return inputs
  }
  
  getNonFilledInputs() {
    const data = this.group?.inputs.filter(input => input.playerInput == undefined)
    const inputs = []
    data.forEach(nonFilledInput => inputs.push(new CommandInputInteraction(nonFilledInput)))
    return inputs
  }
}
