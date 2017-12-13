<template>
	<div class='hello'>
		<div class='container'>
			<!-- <h2 class='well'><img src='../images/back.png'  alt=''>我的订单</h2> -->
			<ul class='order_list' v-if="list.length>0">
				<li v-for='(p,key) in list'>
					<router-link :to="{name:'Order_detail',params:{id:p.orderNum,hotel_id:$route.params.hotel_id,customer_id:$route.params.customer_id}}">	
						<p style="padding: 0.2rem 0.25rem 0"><span>订单号：{{p.id}}</span><span class="right">{{status[p.status]}}</span></p>
						<dl v-for="(item,index) in p.commoditys">
							<dd><img :src='item.commodityFormat.image' alt=''></dd>
							<dt>
								<p style='line-height: 0.7rem;'>{{item.description}} </p>
								<div class='introduce'>
									<p>{{item.commodityFormat.description}}</p><p><span>￥{{item.commodityFormat.currentPrice}}</span><span>X{{item.count}}</span></p>
								</div>	
							</dt>
						</dl>
					</router-link>
					<p style="text-align:right">
						<a v-if="p.status==1" href='javascript:void(0)' v-on:click="make_sure(p,0)">撤销订单</a>
						<a v-if="p.status==1" href='#'>去支付</a>
						<a v-if="p.status==2||p.status==3||p.status==4" href='#'>申请退款</a>
						<router-link v-if="p.status==3"  :to='{name:"Logistics",params:{orderNum:p.orderNum,hotel_id:$route.params.hotel_id,customer_id:$route.params.customer_id}}'>查看物流</router-link>
						<a v-if="p.status==3" href='javascript:void(0)' v-on:click="make_sure(p,4)">确认收货</a>
						<router-link  :to='{"name":"Rate",params:{hotel_id:$route.params.hotel_id,customer_id:$route.params.customer_id}}' v-if="p.status==4">发布评价</router-link>
						<a v-if="p.status==0||p.status==4"  href='javascript:void(0)' v-on:click="dele_order(p.orderNum,key)">删除订单</a>
					</p>
					
				</li>
			</ul>
			<div v-else>还没有添加地址</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				status:['已失效','待付款','待发货','待收货','已完成','待评价'],
				list:[]
			}
		},
		mounted () {
			var self = this;
			this.$http.get(`http://114.215.220.241/WeChat/customers/${this.$route.params.customer_id}/orders/?branchId=${this.$route.params.hotel_id}&page=1&pageSize=15`,{headers:{"token":sessionStorage.getItem("token")}}).then(function(req){
				self.list = req.data;
				self.list.forEach(function(item,key){
					var obj = self.list[key].commoditys;
					obj.forEach(function(item1,key1){
						obj[key1].commodityFormat.image = "http://114.215.220.241/" + item1.commodityFormat.image
					})
				})
			})
		},
		methods: {
			dele_order (id,index){
				var self = this;
				this.$http.delete(`http://114.215.220.241/WeChat/orders/${id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(function(req){
					self.list.splice(index,1);
					alert("删除成功")
				})
			},
			make_sure (x,status){
				this.$http.patch(`http://114.215.220.241/WeChat/orders/${x.orderNum}/`,{status:status},{headers:{"token":sessionStorage.getItem("token")}}).then(req => {
					alert("ok！");
					x.status = status;
				})
			}
		}
	}
</script>
<style scoped>	
	.container>h2{
		text-align: center;
		font-size: 0.36rem;
		line-height: 0.8rem;
		font-weight: normal;
	}
	.order_list li p a{
		display: inline-block;
		padding: 0 0.2rem;
		border:1px solid #9d9d9d;
		color: #2c2c2c;
		margin: 0.1rem;
		background: #fff;
		line-height: 0.5rem;
	}
</style>