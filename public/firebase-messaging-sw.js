/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js')

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyDnibqK2QuwN4yFLX1RaH-JbagqRq48628',
  authDomain: 'ezfarm-back.firebaseapp.com',
  databaseURL: 'https://imap-push-server.firebaseio.com',
  projectId: 'ezfarm-back',
  storageBucket: 'ezfarm-back.appspot.com',
  messagingSenderId: '300110379473',
})

const messaging = getMessaging(firebaseApp)
