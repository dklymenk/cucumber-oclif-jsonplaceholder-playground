const {Command, flags} = require('@oclif/command')
const axios = require('axios').default
const inquirer = require('inquirer')

class CucumberOclifJsonplaceholderPlaygroundCommand extends Command {
  async run() {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')

    this.log('Current post titles:')
    for (const element of data) {
      this.log(element.title)
    }

    const {title} = await inquirer.prompt([{name: 'title'}])
    const {body} = await inquirer.prompt([{name: 'body'}])

    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {title, body})
    this.log(`Created new post with title "${response.data.title}" and id ${response.data.id}`)
  }
}

CucumberOclifJsonplaceholderPlaygroundCommand.description = `Describe the command here
...
Extra documentation goes here
`

CucumberOclifJsonplaceholderPlaygroundCommand.flags = {
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
}

module.exports = CucumberOclifJsonplaceholderPlaygroundCommand
