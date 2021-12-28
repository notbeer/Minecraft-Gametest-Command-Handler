<!-- PROJECT -->
<br />
<p align="center">
  <h3 align="center"><u>Advanced Command Handler</u></h3>

  <p align="center">
    Advanced, easy and efficient custom command builder for Minecraft Bedrock Edition Gametest Framework API.
    <br />
    <br />
    <a href="https://github.com/notbeer/Gametest-Command-Handler">View Demo</a>
    ·
    <a href="https://github.com/notbeer/Gametest-Command-Handler/issues">Report Bug</a>
    ·
    <a href="https://github.com/notbeer/Gametest-Command-Handler/issues">Request Feature</a>
  </p>
</p>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
      <ul>
        <li><a href="#example">Example</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<br />

## About The Project

  Advanced Command Handler is an efficient way to register custom command to your Minecraft Bedrock Edition world. This uses the latest scripting feature "Gametest". This pack makes it easy for you to make custom command, while adding a lot more possibilities to your custom command. The custom commands has built in:
1: cooldowns
2: ability to add inputs and groups
3: and a bunch more!
We have also provided some custom commands for you in the pack to use an reference.


### Built With

* [Gametest FrameWork](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/mojang-minecraft)



<!-- GETTING STARTED -->
<br />

## Getting Started

First of all, create a new file in the commands folder, import the command handler class and builders and use the example command to guide you! Be sure add the command in the import file which is in the commands folder!

### Example

```js
import CommandBuilder from "../classes/builders/CommandBuilder.js";
import CommandHandler from "../classes/CommandRegistration.js"

const registration = new CommandBuilder()
.setName('test') //sets the name of the command, cannot be multiple words
.setAliases(['t','te']) //sets the aliases of the command, can be multiple aliases
.setDescription('illistration of the command handler!') //sets the description of the command
.setUsage(['test', 'test <message>']) //shows how to use the command
.setCancelMessage(true) //if true, the chat the player is trying to send wont be sent
.setPrivate(false) //if true, the command wont show up in the help command and it cannot be accessed by players unless they have the private tag
.setRequiredTags(['test','staff']) //these are the required tags to execute the command, if the player does not have all the required tags they cannot run the command
.setCooldown('1 day 2 seconds') /*the cooldown only accepts strings and must we written in the format shown ( x weeks, x days, x hours, x minuites, x seconds). As of now, the cool down is only local meaning if a player runs the command, the cool down is only on them, rather then a global cooldown which stops the whole command for x amount of time once ran.
*/
.addInput(input => {
  //an input allows the player to fill in information.
  //the name cannot be multiple words
  /*you can set the type of an input, and will parsed to that time, if the player provides an incorrect type, an error will be thrown to the player. 
  there are 4 types, these are:
  Ptring: A string is textual content
  Integer: A number
  Boolean: true or false
  Player: The object of an online player
  Any: Accepts any type of input
    
  if the input is required and the player doesn't fill it in an error will be thrown to the player
  
  example:
    tp <playername>
    playername is the input
  */
  return input.setName('command').setType('string').setDescription('command name you need help on!').setRequired(true)
})
.addGroup(group => {
  /*
  A group is a part of a larger command which allows the player to select more options
  you can add inputs to groups which were explained above 
  
  example:
    players add <player name>
    players remove <player name>
    add and remove are groups, and player name is an input for the groups
  */
  return group.setName('testgroup').setAliases(['testgroup1']).setDescription('a group for the test command!').addInput(input => {
    return input.setName('testgroupinput').setRequired(true).setType('any')
  })
})

//when registering a command you have to input the registration information and a function which will be called upon the command running by using the CommandHandler.register method. example:
CommandHandler.register(registration, (interaction) => {
  /*
  the function has to take in a paramater which will contain the information on the interaction
  the paramter contatins:
    arguments: interaction.args
    the player who ran the CommandBuilder: interaction.player
    the message sent: interaction.message
    the command and methods to retrive information about inputs and groups:
      interaction.command
      
      i can retrive an inputs information by doing the following:
      interaction.command.getInput('the inputs name')
      you can get the players input by using the getValue() method on the input
      note that if the player does not fill it in, the value is undefined
      
      i can retrive a groups information by doing the following:
      interaction.command.getGroup('the groups name')
      you see if the player ran the grouo by using the getRan() method on the group
      you can get an input from the grouo by using the getInput('input name') on the group
      and can get the inputs value by using the getValue() method on the input
      note that if the player does not fill it in, the value is undefined
      
      there are a bunch more interaction method which you can see by looking at the classes methods
  */
})

//documentation coming soon
```

<br />

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/notbeer/Gametest-Command-Handler.git
   ```
2. Download from tag releases

    Easy Method
    * Download the  file ending with `.mcaddon` and import it by double clicking on the folder. This method will only work if you have Minecraft Bedrock Edition on the same device you are doing this action on.
    
    Recommended Method
    * Another Method would be to download the zipped folder and unzip/extract it. Take your folder and move it to the folder 'development_behavior_packs', which can be found in a path like `\Users\USER_NAME\AppData\Local\Packages\Microsoft.MinecraftUWP_8wekyb3d8bbwe\LocalState\games\com.mojang\development_behavior_packs`. This will make your life way easier, while developing this pack. It will update the content inside your game everytime you make any changes to the script. For the changes to apply you must leave and rejoin your world where the pack is applied at.

<br />


<!-- CONTRIBUTING -->
<br />

## Contributing

You can share your amazing talent with other people! Any Contributions are **greatly appreciated**. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
<br />

## License

Distributed under the EULA License. See `LICENSE` for more information.



<!-- CONTACT -->
<br />

## Authors

- Balloon
    - Discord - [baboonie#2522](https://discordapp.com/users/925226749191675985/)
    - Xbox - Ball00nbag
- notbeer
    - Discord - [notbeer#9204](https://discordapp.com/users/606353040336748584/)
    - Xbox - ColoringEmy86

<br />


[contributors-shield]: https://img.shields.io/github/contributors/notbeer/Gametest-Command-Handler.svg?style=for-the-badge
[contributors-url]: https://github.com/notbeer/Gametest-Command-Handler/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/notbeer/Gametest-Command-Handler.svg?style=for-the-badge
[forks-url]: https://github.com/notbeer/Gametest-Command-Handler/network/members
[stars-shield]: https://img.shields.io/github/stars/notbeer/Gametest-Command-Handler.svg?style=for-the-badge
[stars-url]: https://github.com/notbeer/Gametest-Command-Handler/stargazers
[issues-shield]: https://img.shields.io/github/issues/notbeer/Gametest-Command-Handler.svg?style=for-the-badge
[issues-url]: https://github.com/notbeer/Gametest-Command-Handler/issues
[license-shield]: https://img.shields.io/github/license/notbeer/Gametest-Command-Handler.svg?style=for-the-badge
[license-url]: https://github.com/notbeer/Gametest-Command-Handler/blob/main/LICENSE.txt
