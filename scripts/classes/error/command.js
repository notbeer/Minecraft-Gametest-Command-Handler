import { Commands, World } from 'mojang-minecraft'

export default class CommandError {
  constructor({ message, player }) {
    this.message = message;
    this.player = player;
    this.sendErrorMessage();
  }
  
  sendErrorMessage() {
    const command = `tellraw "${this.player}" ${JSON.stringify({ rawtext: [ { text: this.message } ] })}`
    Commands.run(command, World.getDimension('overworld'))
  }
}
