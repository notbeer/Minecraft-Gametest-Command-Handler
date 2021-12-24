import { World } from 'mojang-minecraft'

export default class CommandTypeParser {
  constructor() {}
  
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
    const player = World.getPlayers().find(player => player.name == value || player.nameTag == value)
    if(!value) throw new Error(`${value} is not a player who is online`) 
    return player
  }
}
