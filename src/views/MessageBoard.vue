<template>
  <div class="messages">
    <h1>留言板</h1>
    <div class="form">
      <input type="text" v-model="username" id="username" placeholder="用户名">
      <textarea v-model="message" id="message" placeholder="留言内容"></textarea>
      <button id="submitBtn" @click="submitMsg">留言</button>
    </div>
    <div id="messageBoard">
      <MessageItem
        v-for="item in msgList"
        :key="item.id"
        :nick="item.nick"
        :publish_time="item.publish_time"
        :content="item.content"
      ></MessageItem>
    </div>
  </div>
</template>

<script>
import MessageItem from '@/components/MessageItem.vue'
import { getMessageList, addMessage, addVisitCount } from '@/api/message'

export default {
  components: { MessageItem },
  data() {
    return {
      username: '',
      message: '',
      msgList: []
    }
  },
  mounted() {
    this.loadMsg()
    this.countVisit()
  },
  methods: {
    getCurrentTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const day = ('0' + now.getDate()).slice(-2);
      const hours = ('0' + now.getHours()).slice(-2);
      const minutes = ('0' + now.getMinutes()).slice(-2);
      const seconds = ('0' + now.getSeconds()).slice(-2);
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    },
    async loadMsg() {
      const { data, error } = await getMessageList()
      if (!error) this.msgList = data
    },
    async submitMsg() {
      const content = this.message.trim()
      const name = this.username.trim() || '匿名'
      if (!content) return alert('请输入内容')
      const timeStr = this.getCurrentTime()
      const { error } = await addMessage({
        nick: name,
        content,
        publish_time: timeStr,
        create_time: new Date()
      })
      if (error) return alert('提交失败')
      this.username = ''
      this.message = ''
      this.loadMsg()
      alert('留言发布成功，所有人可见')
    },
    async countVisit() {
      const { data } = await addVisitCount()
      let total = 1
      if (data.length > 0) {
        total = data[0].total + 1
        await sb.from('visit_count').update({ total }).eq('id', data[0].id)
      } else {
        await sb.from('visit_count').insert([{ total: 1 }])
      }
    }
  }
}
</script>

<style scoped>
*{
	padding: 0;
	margin: 0;
	color: #fff;
	box-sizing: border-box;
}
body {
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%);
}
.messages {
	margin-top: 100px;
	width: 1200px;
	padding: 50px 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: linear-gradient(
		to right bottom,
		rgba(255,255,255,.6),
		rgba(255,255,255,.3),
		rgba(255,255,255,.2)
	);
	background-color: rgba(255, 255, 255, 0.266);
	border-radius: 40px;
	box-shadow: 0 10px 50px #00000019;
}
.form {
	display: flex;
	justify-content: center;
	position: relative;
	flex-direction: column;
	width: 100%;
	padding-bottom: 90px;
}
input:focus,textarea:focus {
	outline: none;
}
input,textarea {
	border: none;
	color: #000;
	margin-bottom: 40px;
	font: 900 60px '';
	border-radius: 10px;
	padding: 30px;
}
#username {
	height: 90px;
}
#message {
	height: 200px;
}
.messages h1 {
	width: 100%;
	text-align: left;
	margin-bottom: 70px;
	font-size: 140px;
	background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	letter-spacing: 10px;
}
#submitBtn {
	position: absolute;
	right: 0;
	bottom: 0;
	background-image: linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%);
	border: none;
	font-size: 45px;
	letter-spacing: 5px;
	width: 250px;
	height: 80px;
	border-radius: 50PX;
	color:#000;
}
#messageBoard {
	width: 100%;
	text-align: left;
}
</style>
