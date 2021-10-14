/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js')

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: 'https://imap-push-server.firebaseio.com',
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
})

const messaging = getMessaging(firebaseApp)
