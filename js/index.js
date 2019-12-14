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
    status: 'hoge',
    imgName: 'img/img3-y.jpg'
  },
  watch: {
       // 値が変更された時に呼び出される
      status: {
      },
      imgName: {
          handler: function() {
              setTimeout(this.changeImage,3000);
          },
      }
  },

  created() {
      // this.status = 'Hatanaka'
      this.status = statusRef.on('value', (snapshot) => {
          this.status = snapshot.val()

          if(this.status === 'd') {
              setTimeout(this.initApp,5000);
          }

          if(this.status === 'e') {
              setTimeout(this.changeImage,3000);
          }
      })

  },
  methods: {
      doOperation () {
          this.status = 'b'
          statusRef.set('b')
      },
      initApp:function() {
          this.status = 'b'
          statusRef.set('b')
      },
      changeImage:function() {
          if(this.imgName === 'img/img4.jpg') {
              this.imgName = 'img/img3-y.jpg'
          } else {
              this.imgName = 'img/img4.jpg'
          }
      }

  },
})
