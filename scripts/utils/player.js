import { World, Commands } from 'mojang-minecraft'

class playerBuilder {
  constructor() {
  }
  
  getTags({ name }) {
    const tag_data = Commands.run(`tag "${name}" list`, World.getDimension('overworld'))
    if(!tag_data?.statusMessage) return []
    
    let tags = tag_data.statusMessage.match(/(?<=: ).*$/)
    if(!tags || !tags[0]) return []
    
    return tags[0].split('§r, §a') 
  }
  
  hasTag({ tag, name }) {
    const allTags = this.getTags({ name });
        if (!allTags)
            return false;
        for (const Tag of allTags)
            if (Tag.replace(/§./g, '').match(new RegExp(`^${tag.replace(/§./g, '')}$`)))
                return true;
        return false;
  }
  
  hasAllTags({ name, tags }) {
    return tags.every(tag => this.hasTag({ name, tag }))
  }
  
  exists({ name }) {
    return World.getPlayers().some(player => player.nameTag == name || player.name == name)
  }
  
  find({ name }) {
    if(!this.exists({ name })) return
    return World.getPlayers().find(player => player.nameTag == name || player.name == name)     
  }
}

const player = new playerBuilder()
export default player
