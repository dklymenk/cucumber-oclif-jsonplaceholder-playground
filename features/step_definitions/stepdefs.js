const assert = require('assert')
const {Given, When, Then, After, Before} = require('@cucumber/cucumber')
const sinon = require('sinon')
const {stdout} = require('stdout-stderr')
const cmd = require('../..')
const axios = require('axios').default
const inquirer = require('inquirer')
const MockAdapter = require('axios-mock-adapter')

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

Before(function () {
  this.sandbox = sinon.createSandbox()
  this.sandbox.stub(inquirer, 'prompt')
  this.axiosMock = new MockAdapter(axios)
})

After(function () {
  this.sandbox.restore()
})

Given('a {string} request to {string} returns status {string} and body', function (method, url, status, body) {
  this.axiosMock[`on${capitalize(method)}`](url).reply(status, JSON.parse(body))
})

Given('I would reply with {string} to a {string} prompt', function (input, name) {
  inquirer.prompt.withArgs([{name}]).resolves({[name]: input})
})

When('I run the command', async function () {
  stdout.start()
  await cmd.run()
  stdout.stop()
})

Then('I should see', function (docString) {
  assert.equal(stdout.output, docString)
})

Then('the {string} request to {string} should be sent with', function (method, url, body) {
  assert.equal(this.axiosMock.history[method.toLowerCase()][0].url, url)
  assert.deepEqual(JSON.parse(this.axiosMock.history[method.toLowerCase()][0].data), JSON.parse(body))
})
