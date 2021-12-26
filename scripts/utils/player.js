import { World, Commands } from 'mojang-minecraft'

export default class player {
  constructor(player) {
    this.mojang = player
  }
  
  getTags() {
    const tag_data = Commands.run(`tag "${this.mojang.nameTag}" list`, World.getDimension('overworld'))
    if(!tag_data.statusMessage) return []
    
    let tags = data.statusMessage.match(/(?<=: ).*$/)
    return tags[0].split('§r, §a') 
  }
  
  hasTag(tag) {
    return this.getTags().includes(tag)
  }
  
  hasAllTags({ tags }) {
    return tags.every(tag => this.hasTag(tag))
  }
}
