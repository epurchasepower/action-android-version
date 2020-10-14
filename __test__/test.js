const update = require('../update')

try {
  update('./__test__/build.gradle', process.argv[2] || '', process.argv[3] || '', (err, versionCode, versionName) => {
    if (err) {
      console.error(err.message)
    } else {
      console.log('versionCode', versionCode)
      console.log('versionName', versionName)
    }
  })
} catch (error) {
  console.error(error.message)
}
