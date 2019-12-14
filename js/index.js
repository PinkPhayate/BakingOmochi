const config = {
  apiKey: "AIzaSyCIretB6FXPfHmk3Ib5zokwZ43FVjGZbc0",
  authDomain: "vue-school-chat-room.firebaseapp.com",
  // databaseURL: "https://vue-school-chat-room-51a4c.firebaseio.com/",
  databaseURL: "https://morinodoubutu-c7b72.firebaseio.com/",
  projectId: "vue-school-chat-room",
  storageBucket: "vue-school-chat-room.appspot.com",
  messagingSenderId: "425342500253"
}
firebase.initializeApp(config)

const database = firebase.database()
// const messagesRef = database.ref('messages')
const statusRef = database.ref('status')

new Vue({
  el: "#statusCheck",

  data: {
    status: 'hoge'
  },
  watch: {
       // 値が変更された時に呼び出される
      status: {
      }
  },

  created() {
      // this.status = 'Hatanaka'
      this.status = statusRef.on('value', (snapshot) => {
          this.status = snapshot.val()

          if(this.status === 'd') {
              setTimeout(this.initApp,5000);
          }
      })

  },
  methods: {
      storeMessage () {
          this.status = 'b'
          statusRef.set('b')
      },
      initApp:function() {
          this.status = 'b'
          statusRef.set('b')
      },

  },
})
