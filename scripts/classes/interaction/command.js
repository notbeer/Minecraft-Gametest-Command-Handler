export default class commandInteraction {
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
    return this.command?.usage
  }
  
  getRequiredTags() {
    return this.command?.requiredTags
  }
  
  getInput(name) {
    const input = this.command?.inputs.find(input => input?.name == name)
    return new inputInteraction(input)
  }
  
  getRequiredInputs() {
    const data = this.command?.inputs.filter(input => input.required)
    const inputs = []
    data.forEach(requiredInput => inputs.push(new inputInteraction(requiredInput)))
    return inputs
  }
  
  getFilledInputs() {
    const data = this.command?.inputs.filter(input => input.value != undefined)
    const inputs = []
    data.forEach(filledInput => inputs.push(new inputInteraction(filledInput)))
  }
  
  getNonFilledInputs() {
    const data = this.command?.inputs.filter(input => input.value == undefined)
    const inputs = []
    data.forEach(nonFilledInput => inputs.push(new inputInteraction(nonFilledInput)))
  }
  
  getGroup() {}
  
  getRanGroup() {}
  
  getNonRanGroups
}
