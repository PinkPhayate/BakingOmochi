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
    imgName: 'img/img3-y.jpg',
    judgeImgName: 'img/img3-1.jpg'
  },
  watch: {
       // 値が変更された時に呼び出される
      status: {
      },
      imgName: {
          handler: function() {
              setTimeout(this.changeImage,3000);
          },
      },
      judgeImgName: {
          handler: function() {
              setTimeout(this.changeJudgeImage,1000);
          },
      }
  },

  // 最初に呼び出される
  created() {
      this.status = statusRef.on('value', (snapshot) => {
          this.status = snapshot.val()

          if(this.status === 'c') {
              setTimeout(this.changeJudgeImage,1000);
          }

          if(this.status === 'd') {
              setTimeout(this.restartOperation,5000);
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
      initialize () {
          this.status = 'a'
          statusRef.set('a')
      },
      startBaking() {
          this.status = 'c'
          statusRef.set('c')
      },
      restartOperation:function() {
          this.status = 'b'
          statusRef.set('b')
      },
      changeImage:function() {
          //  statusが変更されたら、imgNameの切り替えが止まるようにする
          if(this.status !== 'e') {
              this.imgName = 'img/img3-y.jpg'
              return;
          }
          if(this.imgName === 'img/img4-1.jpg') {
              this.imgName = 'img/img4-2.jpg'
          } else {
              this.imgName = 'img/img4-1.jpg'
          }
      },
      changeJudgeImage:function() {
          //  statusが変更されたら、judgeImgNameの切り替えが止まるようにする
          if(this.status !== 'c') {
              this.judgeImgName = 'img/img3-1.jpg'
              return;
          }

          if(this.judgeImgName === 'img/img3-1.jpg') {
              this.judgeImgName = 'img/img3-2.jpg'
          } else {
              this.judgeImgName = 'img/img3-1.jpg'
          }
      }

  },
})
