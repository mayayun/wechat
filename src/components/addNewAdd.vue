<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><img  src='../images/back.png'  alt=''>新增地址<a  v-on:click="create()">完成</a></h2>
			<p class='margin'></p>
			<div class='addNewAdd'>
				<ul>
					<li>收货人姓名<input type='text' v-model='add.receiver'></li>
					<li>手机号<input type='text' v-model='add.phone'></li>
					<li>邮编(选填)<input type='text' v-model='add.code'></li>
					<li>
						<!-- <select name='' id=''><option value=''>北京市</option></select><select name='' id=''><option value=''>北京市</option></select><select name='' id=''><option value=''>朝阳区</option></select> -->
						<!-- <v-distpicker type='mobile' :placeholders='placeholders'></v-distpicker> -->
						<p class='addAddIcon'>添加收货地址<router-link  to='/city'><img src='../images/to.png' alt=''></router-link></p>
					</li>
					<li>详细地址<input type='text' v-model='add.address'></li>
				</ul>
				<p>设置为默认地址<img src='../images/unchoose.png' alt=''></p>
			</div>
			
		</div>
	</div>
</template>
<script>
	import VDistpicker from 'v-distpicker'
	export default{
		components: { VDistpicker },
		name: 'addNewAdd',
		data() { 
			return {
				msg: 'test',
				placeholders: {
	              province: '------- 省 --------',
	              city: '--- 市 ---',
	              area: '--- 区 ---',
		        },
		        select: { province: '广东省', city: '广州市', area: '海珠区' },
		        add: {customer:3}
			}
		},
		watch: {
			add:{
				deep:true,
				handler:function(p){
					console.log(p)
				}
			}
		},
		methods: {
			create () {
				var self = this;
			    this.$http.post(`http://114.215.220.241/WeChat/customerAddresses/`,this.add,{headers:{"token":"9oE3eUwxc3rrLvzDliYxfpR0m23Sq+R2"}}).then(res => {
			      //  this.chapterCatelog = res.data.titles.split('-')
			      console.log(res.data.results); 
			      self.$router.replace('/addr');
			    })
			}
		}
	}
</script>
<style scoped>
	footer a:last-child{
		background: transparent;
	}
	.container>h2{
		text-align: center;
		font-size: 0.36rem;
		line-height: 0.8rem;
		font-weight: normal;
	}
	.moreReplay{
		transform: rotateX(180deg);
	}
	.hello{
		background: #fff
	}
</style>