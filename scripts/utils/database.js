import {
	World,
	Commands
} from 'mojang-minecraft'

function textToBinary(text) {
	return text.split('').map((char) => {
		return char.charCodeAt(0).toString(2);
	}).join(' ');
}

function runCommand(command, dimension) {
	try {
		return Commands.run(command, World.getDimension(dimension ?? 'overworld'))
	} catch (e) {}
}

function binaryToText(binary) {
	return binary.split(' ').map((char) => {
		return String.fromCharCode(parseInt(char, 2));
	}).join('');
}

class Database {
	constructor() {}
	table(table) {
		return new Table(table)
	}
}

class Table {
	constructor(table) {
		try {
			runCommand('scoreboard objectives add database dummy')
			runCommand('scoreboard players set global database 1')
		} catch (e) {}

		try {
			this.table = table
			this.insert = {
				table,
				data: []
			}
			this.createTable()
		} catch (e) {
			runCommand(`say constructor error: ${e}`)
		}
	}

	getBinary() {
		try {
			let data = runCommand(`scoreboard players list`)
			if (!data?.statusMessage) return
			return data.statusMessage.match(/(?<=\$binaryDB\()[0-1\s]+(?=\))/g)
		} catch (e) {
			runCommand(`say getBinary error: ${e}`)
		}
	}

	getTable() {
		try {
			let allBinary = this.getBinary()
			if (!allBinary) return

			for (const table of allBinary) {
				let tableObject = JSON.parse(binaryToText(table))
				if (tableObject.table == this.table) return tableObject
			}
		} catch (e) {
			runCommand(`say getTable error: ${e}`)
		}
	}

	hasTable() {
		try {
			const table = this.getTable()
			if (!table) return false
			return true
		} catch (e) {
			runCommand(`say hasTable error: ${e}`)
		}
	}

	createTable() {
		try {
			if (this.hasTable()) return
			let table = JSON.stringify(this.insert)
			runCommand(`scoreboard players set "$binaryDB(${textToBinary(table)})" database 0`)
		} catch (e) {
			runCommand(`say createTable error: ${e}`)
		}
	}

	updateTable(table) {
		try {
			let oldTable = JSON.stringify(this.getTable())
			runCommand(`scoreboard players reset "$binaryDB(${textToBinary(oldTable)})"`)

			let newTable = JSON.stringify(table)
			runCommand(`scoreboard players set "$binaryDB(${textToBinary(newTable)})" database 0`)
		} catch (e) {
			runCommand(`say updateTable error: ${e}`)
		}
	}

	all(sort) {
		try {
			let table = this.getTable()
			if (!table) return []
			if (sort) table.data = table.data.sort(sort)
			return table.data
		} catch (e) {
			runCommand(`say all error: ${e}`)
		}
	}

	get(key) {
		try {
			if (!this.has(key)) return
			let allValues = this.all()
			return allValues.filter(value => value?.key?.includes(key))[0]
		} catch (e) {
			runCommand(`say get error: ${e}`)
		}
	}

	has(key) {
		try {
			let allValues = this.all()
			return allValues.some(value => value?.key?.includes(key))
		} catch (e) {
			runCommand(`say has error: ${e}`)
		}
	}

	hasAny(key) {
		try {
			let allValues = this.all()
			let keys = [...key]
			return allValues.some(value => keys.some(k => value.key.includes(k)))
		} catch (e) {
			runCommand(`say hasAny error: ${e}`)
		}
	}

	hasAll(key) {
		try {
			let allValues = this.all()
			let keys = [...key]
			return keys.every((k) => this.has(k))
		} catch (e) {
			runCommand(`say hasAll error: ${e}`)
		}
	}

	set(key, value) {
		try {
			if (this.has(key)) return
			this.update(key, value)
			let Table = this.getTable()
			Table.data.push({
				key: [...key],
				value
			})
			this.updateTable(Table)
		} catch (e) {
			runCommand(`say set error: ${e}`)
		}
	}

	remove(key) {
		try {
			if (!this.has(key)) return
			let value = this.get(key)
			let table = this.getTable()

			let index = table.data.indexOf(value)
			table.data.splice(index, 1)

			this.updateTable(table)
		} catch (e) {
			runCommand(`say remove error: ${e}`)
		}
	}

	update(key, value) {
		try {
			if (!this.has(key)) return
			let keys = this.get(key).key
			this.remove(key)
			this.set(keys, value)
		} catch (e) {
			runCommand(`say update error: ${e}`)
		}
	}

	setMany(array) {
		try {
			array?.forEach(data => {
				let key = data?.key
				let value = data?.value
				if (!key || !value) return
				this.set([...key], value)
			})
		} catch (e) {
			runCommand(`say setMany error: ${e}`)
		}
	}

	removeMany(array) {
		try {
			array?.forEach(key => {
				if (typeof key !== 'string') return
				this.remove(key)
			})
		} catch (e) {
			runCommand(`say removeMany error: ${e}`)
		}
	}
}

let database = new Database()
export default database
