const assert = require('assert')
const {Given, When, Then, After, Before} = require('@cucumber/cucumber')
const sinon = require('sinon')
const {stdout} = require('stdout-stderr')
const cmd = require('../..')
const axios = require('axios').default
const inquirer = require('inquirer')

Before(function () {
  this.sandbox = sinon.createSandbox()
  this.sandbox.stub(inquirer, 'prompt')
  this.sandbox.spy(axios)
})

After(function () {
  this.sandbox.restore()
})

Given('a {string} request to {string} returns status {string} and body', function (method, url, status, body) {
  this.sandbox.stub(axios, method.toLowerCase()).withArgs(url).resolves({status, data: JSON.parse(body)})
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
  assert.deepEqual(axios[method.toLowerCase()].firstCall.args, [url, JSON.parse(body)])
})
