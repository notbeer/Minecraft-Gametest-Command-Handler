import commandError from './commandError.js'

export default class commandParser {
  constructor({ command, args, player }) {
    this.error = false
    this.command = command
    this.args = args
    this.player = player
    this.parsedCommand = {
      inputs: this.parseInputs(this.command, this.args, this.player),
      groups: this.parseGroups(this.command, this.args, this.player),
      ...this.command
    }
  }
  
  parseGroups(command, args, player) {
      const groups = command.groups
      const groupInput = args.shift()
  
      let parsedGroups = []
      groups?.forEach(group => parsedGroups.push({ ...group, ran: group?.name === groupInput }))
  
      parsedGroups?.forEach(parsedGroup => {
        let groupIndex = parsedGroups.indexOf(parsedGroup)
        let inputs = parsedGroup?.inputs
        if(!inputs) return
    
        let parsedInputs = []
        inputs.forEach(input => {
          let inputIndex = inputs.indexOf(input)
          let playerInput = args[inputIndex] ?? undefined
          
          if(input.required && !playerInput) {
            this.error = true
             new commandError({ message: `input for ${input?.name} at group ${parsedGroup?.name} is required!`, player })
          }
          
          const parsedInput = playerInput != undefned && input.type != 'any' ? new typeParser()[input.type](playerInput) : playerInput
          if(parsedInput?.error) {
            this.error = true
            new commandError({ message: `invalid type for input ${input.name} at group ${parsedGroup.name}. The input type should be a/an ${input.type}`, player })
          }
          parsedInputs.push({ ...input, parsedInput  })
      })
    
     parsedGroups[groupIndex].inputs = parsedInputs
   })
    
    return parsedGroups
  }
  
  parseOptions(command, args, player) {
    const inputs = command.inputs
    
    let parsedOptions = []
    inputs?.forEach(input => {
      let index = inputs?.indexOf(option)
      let playerInput = this.ranGroup() ? undefined : args[index]
      
      if(input.required && !playerInput) {
        new commandError({ message: `input for ${option.name} is required!`, player })
        this.error = true
      }
        
      const parsedInput = playerInput != undefned && input.type != 'any' ? new typeParser()[input.type](playerInput) : playerInput
      if(parsedInput?.error) {
          this.error = true
          new commandError({ message: `invalid type for input ${input.name}. The input type should be a/an ${input.type}`, player })
      }
      
      parsedOptions.push({ ...option, playerInput })
    })
    
    return parsedOptions
  }
  
  ranGroup() {
    //const args = this?.args
    const group = this?.args[0] //args.length ? args[0] : null
    return this.command?.groups?.some(cmdGroup => cmdGroup?.name === group)
  }
}
