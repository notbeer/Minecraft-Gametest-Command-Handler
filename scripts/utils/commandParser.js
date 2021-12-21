import commandError from './commandError.js'

export default class commandParser {
  constructor({ command, args, player }) {
    this.command = command
    this.args = args
    this.player = player
    try {
    this.parsedCommand = {
        inputs: this.parseInputs(this.command, this.args, this.player),
        groups: this.parseGroups(this.command, this.args, this.player),
        ...this.command
      }
    } catch(e) {
      throw new Error()
    }
  }
  
  parseGroups(command, args, player) {
      const groups = command.groups
      const groupInput = args.shift()
  
      let parsedGroups = []
      groups?.forEach(group => parsedGroups.push({ ...group, ran: group?.name === groupInput || group?.aliases.includes(groupInput) }))
  
      parsedGroups?.forEach(parsedGroup => {
        let groupIndex = parsedGroups.indexOf(parsedGroup)
        let inputs = parsedGroup?.inputs
        if(!inputs) return
    
        let parsedInputs = []
        inputs.forEach(input => {
          let inputIndex = inputs.indexOf(input)
          let playerInput = args[inputIndex] ?? undefined
          
          if(input.required && !playerInput) {
             new commandError({ message: `input for ${input?.name} at group ${parsedGroup?.name} is required!`, player })
             throw new Error()
          }
          
          try {
             const parsedInput = playerInput != undefined && input.type != 'any' ? new typeParser()[input.type](playerInput) : playerInput
            } catch(e) {
              new commandError({ message: `invalid type for input ${input.name} at group ${parsedGroup.name}. The input type should be a/an ${input.type}`
              throw new Error()
            }
          
          parsedInputs.push({ ...input, parsedInput  })
      })
    
     parsedGroups[groupIndex].inputs = parsedInputs
   })
    
    return parsedGroups
  }
  
  parseInputs(command, args, player) {
    const inputs = command.inputs
    
    let parsedInputs = []
    inputs?.forEach(input => {
      let index = inputs?.indexOf(option)
      let playerInput = this.ranGroup() ? undefined : args[index]
      
      if(input.required && !playerInput) {
        new commandError({ message: `input for ${input.name} is required!`, player })
        throw new Error()
      }
        
      const parsedInput = playerInput != undefined && input.type != 'any' ? new typeParser()[input.type](playerInput) : playerInput
      if(parsedInput?.error) {
          new commandError({ message: `invalid type for input ${input.name}. The input type should be a/an ${input.type}`, player })
          throw new Error()
      }
      
      parsedInputs.push({ ...option, playerInput })
    })
    
    return parsedInputs
  }
  
  ranGroup() {
    //const args = this?.args
    const group = this?.args[0] //args.length ? args[0] : null
    return this.command?.groups?.some(cmdGroup => cmdGroup?.name === group)
  }
}
