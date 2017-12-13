<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><!-- <img src='../images/back.png' style='' alt=''> -->地址管理<a href='javascript:void(0)' v-on:click='editable = !editable'>{{!editable?'管理':'修改'}}</a></h2>
			<p class='margin'></p>
			<ul class='add_List' v-if="list.length>0">
				<li v-for='(p,key) in list'>
					<dl v-on:click="choose_add(p.id)">
						<dd>{{p.receiver}}<span>{{p.phone}}</span></dd>
						<dt><span v-if="p.isDefault">(默认地址)</span>{{p.address}}</dt>
						<!-- -if='p.isdefault&&!editable' -->
						<dt v-if='editable'><img v-show='p.isDefault&&editable' src='../images/choose.png' alt=''><img v-on:click='chooseDefault(key)' v-show='!p.isDefault&&editable' src='../images/unchoose.png' alt=''><span>设置为默认地址</span><a v-on:click='dele(key)' href='javascript:void(0)' class='right'>删除</a> <router-link class='right' :to='{ name: "AddNewAddr", params: { id: p.id,customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}' style='margin: 0 0.1rem;'>编辑</router-link></dt>
					</dl>
				</li>
			</ul>
			<div v-else>还没有添加地址</div>
			<footer class='well'>
				<p class='addAdd'><router-link :to='{name:"AddNewAdd",params:{id:-1,customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}'><img src='../images/add01.png' alt=''>新增地址</router-link></p>
			</footer>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'Addr',
		data () {
			return {
				editable:false,
				list: []
			}
		},
		methods: {
			chooseDefault(index){
				var self = this;
				this.$http.patch(`http://114.215.220.241/WeChat/customers/${this.$route.params.customer_id}/defaultAddress/`,{"address":self.list[index].id},{headers:{"token":sessionStorage.getItem("token")}}).then(
			      req => {
			      	self.list.forEach(function(item){
						item.isDefault = false;
					})
					self.list[index].isDefault = true;
			        
			      })
				
			},
			dele(index){
				var self = this;
				this.$http.delete(`http://114.215.220.241/WeChat/customerAddresses/${self.list[index].id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(
			      req => {
			      	self.list.splice(index,1)
			        
			      })
			},
			choose_add(id){
				if(this.editable === false){
					//alert("ok");
					sessionStorage.setItem("add",id);
					this.$router.replace({name:"Order",params:{customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}})
				}
			}
		},
		mounted () {
			var self = this;
			this.$http.get(`http://114.215.220.241/WeChat/customers/${this.$route.params.customer_id}/address/`,{headers:{"token":sessionStorage.getItem("token")}}).then(
		      req => {
		      	self.list = req.data
		        
		      })
		}
	}
</script>
<style scoped>
	footer a:last-child{
		background: transparent;
		color: #000
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
	.margin{
		background: #f1eded;
		height: 0.05rem
	}

	.addAddIcon{
		line-height: 0.8rem;
	}
	.addAddIcon img:first-child{
		height: 1em;vertical-align: middle;margin: 0 0.8em;
	}
	.addAddIcon img:last-child{
		float: right;height: 1em;
		margin: 0.22rem 0.1rem;
	}
</style>