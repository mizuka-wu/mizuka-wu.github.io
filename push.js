const admin = require('firebase-admin')

const serviceAccount = require('../配置文件/myblog-e0d34-firebase-adminsdk-7ufm0-333f43dfdb.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://myblog-e0d34.firebaseio.com'
})

var message = {
  token: "dvE_ZH4hiMQ:APA91bEVleqCsfHkMOzdajxtMRhqFeWELbX1bk6Y8b_ZEOWPyUzrogXlX2ffpxBxhyXtA3JBL-vJHgtN2DzSohEqzrFpxqNNA3MQVDgWZddUkmYX5zZy--WzNHcCBM7J6cqGtKdxnILy",
  webpush: {
    notification: {
      title: '$GOOG up 1.43% on the day',
      body:
        '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.',
      icon: 'https://www.mizuka.top/assets/logo-64.png'
    }
  }
}

// Send a message to devices subscribed to the provided topic.
admin
  .messaging()
  .send(message)
  .then(response => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response)
  })
  .catch(error => {
    console.log('Error sending message:', error)
  })
