import { World, Commands } from 'mojang-minecraft'

class playerBuilder {
  constructor() {
  }
  
  getTags({ name }) {
    const tag_data = Commands.run(`tag "${name}" list`, World.getDimension('overworld'))
    if(!tag_data?.statusMessage) return []
    
    let tags = tag_data.statusMessage.match(/(?<=: ).*$/)
    if(!tags[0]) return []
    
    return tags[0].split('§r, §a') 
  }
  
  hasTag({ tag, name }) {
    return this.getTags({ name }).includes(tag)
  }
  
  hasAllTags({ name, tags }) {
    return tags.every(tag => this.hasTag({ name, tag }))
  }
}

const player = new playerBuilder()
export default player
