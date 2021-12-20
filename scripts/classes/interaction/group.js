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
    const input = this.group?.options?.find(option => option.name == name)
    return new inputInteraction(input)
  }
}
