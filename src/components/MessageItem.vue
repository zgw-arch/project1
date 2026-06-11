<template>
  <div class="message">
    <div class="message-info">
      <div class="info">
        <img src="1.jpg" alt="头像">
        <strong>{{ nick }}</strong>
      </div>
      <span>发布于：{{ publish_time }}</span>
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: ['nick', 'publish_time', 'content']
}
</script>

<style scoped>
.message {
	width: 100%;
	opacity: 0;
	animation: messageFadeIn 0.5s ease forwards;
	background-image: linear-gradient(90deg, #8ec5fc 0%, #e0c3fc 100%);
	margin: 70px 0;
	border-radius: 10px;
	box-shadow: 0 10px 20px #00000026;
	text-shadow: 0px 0px 20px #ffffff;
	padding:10px;
}
.message-info {
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 36px;
	position: relative;
}
.info {
	transform: translateY(-30px);
}
.info img {
	width: 150px;
	height: 150px;
	border-radius: 50%;
	border: 10px #fff solid;
}
strong {
	position: absolute;
	width: 800px;
	letter-spacing: 3px;
	top: 70px;
	left: 170px;
	color:#fff;
}
.message-info span {
	position: absolute;
	top: 10px;
	right: 10px;
	color:#fff;
}
.content {
	font-size: 44px;
	margin: 30px;
	width: 95%;
	color:#fff;
	line-height:1.6;
	white-space: pre-wrap;
}
@keyframes messageFadeIn {
	to { opacity: 1; }
}
</style>
