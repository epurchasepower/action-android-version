const core = require('@actions/core')
const github = require('@actions/github')
const fs = require('fs')

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/

try {
  const gradlePath = core.getInput('gradlePath')
  const versionCodeUpdate = core.getInput('versionCodeUpdate')
  const versionNameUpdate = core.getInput('versionNameUpdate')
  console.log(`Gradle Path : ${gradlePath}`)
  if (versionCodeUpdate.length > 0) {
    console.log(`Version Code will be changed to : ${versionCodeUpdate}`)
  }
  if (versionNameUpdate.length > 0) {
    console.log(`Version Name will be changed to : ${versionNameUpdate}`)
  }

  fs.readFile(gradlePath, 'utf8', function (err, data) {
    let newGradle = data
    if (versionCode.length > 0) {
      newGradle = newGradle.replace(versionCodeRegexPattern, `$1${versionCode}`)
    }
    if (versionName.length > 0) {
      newGradle = newGradle.replace(versionNameRegexPattern, `$1\"${versionName}\"`)
    }
    const setOutputs = (err) => {
      if (err) {
        core.setFailed(err.message)
      } else {
        core.setOutput('result', 'Done')
        core.setOutput('versionCode', newGradle.match(versionCodeRegexPattern)[2])
        core.setOutput('versionName', newGradle.match(versionNameRegexPattern)[2])
      }
    }
    if (versionCode.length > 0 || versionName.length > 0) {
      fs.writeFile(gradlePath, newGradle, function (err) {
        if (err) {
          throw err
        }
        if (versionCode.length > 0) {
          console.log(`Successfully override version code ${versionCode}`)
        }
        if (versionName.length > 0) {
          console.log(`Successfully override version code ${versionName}`)
        }
        setOutputs()
      })
    } else {
      setOutputs()
    }
  })

} catch (error) {
  core.setFailed(error.message)
}
