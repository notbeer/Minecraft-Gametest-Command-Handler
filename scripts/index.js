import { World } from "mojang-minecraft"
import CommandBuilder from "./classes/builders/CommandBuilder";
const register = new CommandBuilder()
    .setCancelMessage(true)
    .setName('warp')
    .setAliases(['tp', 'teleport'])
    .setDescription('Warping custom command')
    .setCooldown('5 seconds')
    .addGroup(g => g
    .setName('spawn')
    .setAliases(['hub', 'lobby'])
    .setDescription('Warp to the spawn'))
    .addGroup(g => g
    .setName('shop'))
    .addGroup(g => g
    .setName('player')
    .addInput(o => o
    .setType('string')
    .setRequired(true)
    .setName('name')
    .setDescription('The player name you want to warp to')));
console.log(JSON.stringify(register.toJSON(), null, 2));
/*
command.register(register, (data, args) => {
    console.log(data);
});

const string = "+warp shop"
command.exec(string);
*/
// npx ts-node src/index.ts
