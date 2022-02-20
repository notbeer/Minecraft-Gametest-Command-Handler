import { world } from 'mojang-minecraft'

export class CommandTypeParserBuilder {
  constructor() {
    this.types = [
      {
        name: 'string',
        parse: (value) => this.toString(value)
      },
      {
        name: 'int',
        parse: (value) => this.toInt(value)
      },
      {
        name: 'boolean',
        parse: (value) => this.toBoolean(value)
      },
      {
        name: 'player',
        parse: (value) => this.toPlayer(value)
      },
    ]
  }
  
  toString(value) {
    return value.toString()
  }
  
  toInt(value) {
    const data = +value
    if(!data) throw new Error(`${value} is not a number!`) 
    return data
  }
  
  toBoolean(value) {
    if(value != 'true' && value != 'false') throw new Error(`${value} is not a boolean`)
    return value === 'true'
  }
  
  toPlayer(value) {
    const player = [...world.getPlayers()].find(player => player.name == value || player.nameTag == value)
    if(!player) throw new Error(`${value} is not a player who is online`) 
    return player
  }
}

let CommandTypeParser = new CommandTypeParserBuilder()
export default CommandTypeParser 
