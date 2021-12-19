import commandError from './commandError.js'

export default class commandParser {
  constructor({ command, args, player }) {
    this.command = command
    this.args = args
    this.player = player
    this.parsedGroups = this.parseGroups()
    this.parsedOptions = this.parseOptions()
    this.command.options = this.parsedOptions
    this.command.groups = this.parsedGroups
    return this.command
  }
  
 
  parseGroups() {
    if(!this.ranGroup()) return
    const args = this.args
    const inputGroup = args[0]
    
    let parsedGroups = []
    this.command.groups.forEach(group => {
      const commandRan = group.name === inputGroup
      parsedGroups.push({ ...group, ran: commandRan })
    })
    
    args.splice(0, 1)
    parsedGroups.forEach(parsedGroup => {
      const index = parsedGroups.indexOf(parsedGroup)
      const options = parsedGroup.options
      const parsedOptions = []
      options.forEach(option => {
        let index1 = options.indexOf(option)
        let value = args[index1]
        parsedOptions.push({ ...option, value })
      })
     
      parsedGroups[index].options = parsedOptions
    })
    
    return parsedGroups
  }
  
  parseOptions() {
    const args = this.args
    let parsedOptions = []
    this.command.options.forEach(option => {
      let index = this.command.options.indexOf(option)
      let value = this.ranGroup() ? undefined : args[index]
      
      //if(option.required && !value) //do smt
      
      parsedOptions.push({ ...option, value })
    })
    
    return parsedOptions
  }
  
  ranGroup() {
    const args = this?.args
    const group = args?[0]
    return this.command?.groups?.some(cmdGroup => cmdGroup?.name === group)
  }
}
