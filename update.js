const fs = require('fs')

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /(^\s*)(versionCode(?:\s*|=)\s*)(\S*)(\s*(?:\/\*.*)?)$/m
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /(^\s*)(versionName(?:\s*|=)\s*)"([^"]*)"(\s*(?:\/\*.*)?)$/m

module.exports = function(gradlePath, versionCodeUpdate, versionNameUpdate, cb) {
  console.log(`Gradle Path : ${gradlePath}`)
  if (versionCodeUpdate.length > 0) {
    console.log(`Version Code will be changed to : ${versionCodeUpdate}`)
  }
  if (versionNameUpdate.length > 0) {
    console.log(`Version Name will be changed to : ${versionNameUpdate}`)
  }

  fs.readFile(gradlePath, 'utf8', function (err, data) {
    let newGradle = data
    if (versionCodeUpdate.length > 0) {
      newGradle = newGradle.replace(versionCodeRegexPattern, `$1$2${versionCodeUpdate}$4`)
    }
    if (versionNameUpdate.length > 0) {
      newGradle = newGradle.replace(versionNameRegexPattern, `$1$2\"${versionNameUpdate}\"$4`)
    }
    const finish = (err) => {
      if (err) {
        cb(err)
      } else {
        cb(
          null,
          newGradle.match(versionCodeRegexPattern)[3],
          newGradle.match(versionNameRegexPattern)[3]
        )
      }
    }
    if (versionCodeUpdate.length > 0 || versionNameUpdate.length > 0) {
      fs.writeFile(gradlePath, newGradle, function (err) {
        if (err) {
          throw err
        }
        if (versionCodeUpdate.length > 0) {
          console.log(`Successfully override version code ${versionCodeUpdate}`)
        }
        if (versionNameUpdate.length > 0) {
          console.log(`Successfully override version code ${versionNameUpdate}`)
        }
        finish()
      })
    } else {
      finish()
    }
  })
}
