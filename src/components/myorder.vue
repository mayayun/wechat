<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><img src='../images/back.png'  alt=''>我的订单</h2>
			<ul class='order_list' v-if="list.length>0">
				<li v-for='(p,key) in list'>
					<router-link :to="{name:'Order_detail',params:{id:p.id}}">	
						<p style="padding: 0.2rem 0.25rem 0"><span>订单号：{{p.id}}</span><span class="right">{{status[p.status]}}</span></p>
						<dl v-for="(item,index) in p.commoditys">
							<dd><img src='../images/logistics.jpg' alt=''></dd>
							<dt>
								<p style='line-height: 0.7rem;'>{{item.commodityFormat.description}} </p>
								<div class='introduce'>
									<p>{{item.commodityFormat.inventory}}</p><p><span>￥{{item.commodityFormat.currentPrice}}</span><span>X{{item.count}}</span></p>
								</div>	
							</dt>
						</dl>
						<p style="text-align:right">
							<a v-if="p.status==1" href='#'>撤销订单</a>
							<a v-if="p.status==1" href='#'>去支付</a>
							<a v-if="p.status==2||p.status==3||p.status==4" href='#'>申请退款</a>
							<router-link v-if="p.status==3"  to='/logistics'>查看物流</router-link>
							<a v-if="p.status==3" href='#'>确认收货</a>
							<router-link  to='/rate' v-if="p.status==4">发布评价</router-link>
							<a v-if="p.status==0||p.status==4"  href='javascript:void(0)' v-on:click="dele_order(p.id,key)">删除订单</a>
						</p>
					</router-link>
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
			this.$http.get("http://114.215.220.241/WeChat/customers/3/orders/?branchId=1&page=1&pageSize=15",{headers:{"token":sessionStorage.getItem("token")}}).then(function(req){
				self.list = req.data;
			})
		},
		methods: {
			dele_order (id,index){
				var self = this;
				this.$http.delete(`http://114.215.220.241/WeChat/orders/${id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(function(req){
					self.list.splice(index,1);
					alert("删除成功")
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