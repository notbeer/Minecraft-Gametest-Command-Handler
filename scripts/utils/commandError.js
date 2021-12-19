import { Commands, World } from 'mojang-minecraft'

export default class commandError {
  constructor({ message, player, command }) {
    this.command = command ?? undefined
    this.message = message;
    this.player = player;
    return this.sendErrorMessage();
  }
  
  sendErrorMessage() {
    const name = this.player.nameTag;
    const command = `tellraw "${name}" ${JSON.stringify({ rawtext: [ { text: this.message } ] })}`
    Commands.run(command, World.getDimension('overworld'))
    
    return new Error(`this.message at command: ${this.command?.name}`)
  }
}
