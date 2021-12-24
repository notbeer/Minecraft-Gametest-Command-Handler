import CommandTypeParser from './type.js'

export default class CommandInputsParser {
  constructor({ inputs, args }) {
    this.inputs = inputs
    this.args = args
  }
  
  toParsedInputs() {
    const ParsedInputs = []
    
    for(const Input of this.inputs) {
      let InputIndex = this.inputs.indexOf(Input)
    }
    return ParsedInputs
  }
}
