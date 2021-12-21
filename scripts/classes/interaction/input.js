export default class inputInteraction {
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
    return this.input?.type
  }
  
  getValue() {
    return this.input?.playerInput
  }
}
