import CommandTypeParser from './type.js'

export default class CommandInputsParser {
  constructor({ inputs, args }) {
    this.inputs = inputs
    this.args = args
  }
  
  toParsedInputs() {
    const ParsedInputs = []
    
    for(const Input of this.inputs) {
      const InputIndex = this.inputs.indexOf(Input)
      let playerInput = this.args[InputIndex]
      
      if(Input.required && !playerInput)
        throw new Error(`input for ${Input.name} is required!`)
     
      
      try {
        for(const type of CommandTypeParser.types) {
           if(!playerInput || Input.type == 'any') break
           if(type.name != Input.type) continue;
           playerInput = type.parse(playerInput)
        }
        /*switch(Input.type) {
          case "string":
            if(!playerInput) break;
            playerInput = CommandTypeParser.toString(playerInput)
            break;
          case "int":
            if(!playerInput) break;
            playerInput = CommandTypeParser.toInt(playerInput)
            break;
          case "boolean":
            if(!playerInput) break;
            playerInput = CommandTypeParser.toBoolean(playerInput)
            break;
          case "player":
            if(!playerInput) break;
            playerInput = CommandTypeParser.toPlayer(playerInput)
            break;
          default:
            break;
        }*/
      } catch(e) {
        throw new Error(`incorrect input type for ${Input.name}, input type must be a/an ${Input.type}`)
      }
      
      ParsedInputs.push({ ...Input, playerInput })
    }
    return ParsedInputs
  }
}
