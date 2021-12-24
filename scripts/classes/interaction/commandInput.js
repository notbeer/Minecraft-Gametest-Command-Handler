export default class CommandInputInteraction {
  constructor(input) {
    this.input = input
  }
  
  getName() {
    return this.input?.name
  }
  
  getDescription() {
    return this.input?.description
  }
  
  getRequired() {
    return this.input?.required
  }
  
  getType() {
    return this.input?.playerInput
  }
  
  getValue() {
    return this.input?.playerInput
  }
}
