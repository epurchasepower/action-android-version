const core = require('@actions/core')
const github = require('@actions/github')
const update = require('./update')

try {
  const gradlePath = core.getInput('gradlePath')
  const versionCodeUpdate = core.getInput('versionCodeUpdate')
  const versionNameUpdate = core.getInput('versionNameUpdate')
  update(gradlePath, versionCodeUpdate, versionNameUpdate, (err, versionCode, versionName) => {
    if (err) {
      core.setFailed(err.message)
    } else {
      core.setOutput('result', 'Done')
      core.setOutput('versionCode', versionCode)
      core.setOutput('versionName', versionName)
    }
  })
} catch (error) {
  core.setFailed(error.message)
}
