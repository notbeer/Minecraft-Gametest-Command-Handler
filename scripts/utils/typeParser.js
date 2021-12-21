import { World } from 'mojang-minecraft'
class typeParser {
  constructor() {}
  
  string(value) {
    return value.toString()
  }
  
  int(value) {
    const data = +value
    if(!data) throw new Error(`${value} is not a number!`) //return { error: true, errorMessage: `${value} is not a number!`}
    return data
  }
  
  boolean(value) {
    if(value != 'true' && value != 'false') throw new Error(`${value} is not a boolean`)//return { error: true, errorMessage: `${value} is not a boolean`}
    return value === 'true'
  }
  
  player(value) {
    const player = World.getPlayers().find(player => player.name == value || player.nameTag == value)
    if(!value) throw new Error(`${value} is not a player who is online`) //return { error: true, errorMessage: `${value} is not a player who is online` }
    return player
  }
} 

