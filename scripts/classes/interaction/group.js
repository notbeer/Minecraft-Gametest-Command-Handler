import inputInteraction from './input.js'

class groupInteraction {
  constructor(group) {
    this.group = group
  }
  
  getRan() {
    return this.group?.ran
  }
  
  getName() {
    return this.group?.name
  }
  
  getDescription() {
    retrun this.group?.description
  }
  
  getAliases() {
    return this.group?.aliases
  }
  
  getUsages() {
    return this.group?.usages
  }
  
  getInput(name) {
    const input = this.group?.inputs?.find(option => option.name == name)
    return new inputInteraction(input)
  }
  
  getInputs() {
    const data = this.group?.inputs
    const inputs = []
    data.forEach(input => inputs.push(new inputInteraction(input)))
    return inputs
  }
  
  getRequiredInputs() {
    const data = this.group?.inputs.filter(input => input.required)
    const inputs = []
    data.forEach(requiredInput => inputs.push(new inputInteraction(requiredInput)))
    return inputs
  }
  
  getFilledInputs() {
    const data = this.group?.inputs.filter(input => input.value != undefined)
    const inputs = []
    data.forEach(filledInput => inputs.push(new inputInteraction(filledInput)))
    return inputs
  }
  
  getNonFilledInputs() {
    const data = this.group?.inputs.filter(input => input.value == undefined)
    const inputs = []
    data.forEach(nonFilledInput => inputs.push(new inputInteraction(nonFilledInput)))
    return inputs
  }
}
