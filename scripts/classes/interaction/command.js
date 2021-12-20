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
    const input = this.command?.inputs.find(input => input.name == name)
    return new inputInteraction(input)
  }
  
  getRequiredInputs() {}
  
  getFilledInputs() {}
  
  getNonFilledInputs() {}
  
  getGroup() {}
  
  getRanGroup() {}
  
  getNonRanGroups
}
