import { Commands, World } from 'mojang-minecraft'

export default class CommandError {
  constructor({ message, player }) {
    this.message = message;
    this.player = player;
    this.sendErrorMessage();
  }
  
  sendErrorMessage() {
    const name = this.player.nameTag;
    const command = `tellraw "${name}" ${JSON.stringify({ rawtext: [ { text: this.message } ] })}`
    Commands.run(command, World.getDimension('overworld'))
    
    //return new Error(`this.message at command: ${this.command?.name}`)
  }
}
