import { world } from 'mojang-minecraft'

class playerBuilder {
  constructor() {
    this.dimension = world.getDimension('overworld')
  }
  
  getTags({ name }) {
    const tag_data = this.dimension.runCommand(`tag "${name}" list`)
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
    return [...world.getPlayers()].some(player => player.nameTag == name || player.name == name)
  }
  
  find({ name }) {
    if(!this.exists({ name })) return
    return [...world.getPlayers()].find(player => player.nameTag == name || player.name == name)     
  }
}

const player = new playerBuilder()
export default player
