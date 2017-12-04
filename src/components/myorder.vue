<template>
	<div class='hello'>
		<div class='container'>
			<!-- <h2 class='well'><img src='../images/back.png'  alt=''>我的订单</h2> -->
			<ul class='order_list'>
				<li v-for='(p,key) in list'>
					<dl>
						<dd><span><img src='../images/selected.png' alt=''></span><img :src='p.url' alt=''></dd>
						<dt>
							<p style='line-height: 0.7rem;'>{{p.name}} <span>{{status[p.status]}}</span></p>
							<div class='introduce'>
								<p>{{p.summry}}</p><p><span>￥{{p.price}}</span><span>X{{p.count}}</span></p>
							</div>
							<p>
								<a v-if='p.status==0' href='#'>撤销订单</a>
								<a v-if='p.status==0' href='#'>付款</a>
								<router-link v-if='p.status==2' to='/logistics'>查看物流</router-link>
								<a v-if='p.status==2' href='#'>确认收货</a>
								<router-link v-if='p.status==3' to='/rate'>发布评价</router-link>
								<a v-if='p.status==4' href='#'>删除订单</a>
							</p>
						</dt>
					</dl>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				status:['待付款','待发货','待收货','待评价','已完成'],
				list:[
					{
						url:require('../images/logistics.jpg'),
						summry:'天天特价，好吃的坚果糕，自己吃，送大礼都可以，礼盒装',
						price:10,
						count:1,
						status:0,
						name:'货品1'
					},
					{
						url:require('../images/logistics.jpg'),
						summry:'天天特价，好吃的坚果糕，自己吃，送大礼都可以，礼盒装',
						price:10,
						count:1,
						status:1,
						name:'货品2'
					},
					{
						url:require('../images/logistics.jpg'),
						summry:'天天特价，好吃的坚果糕，自己吃，送大礼都可以，礼盒装',
						price:10,
						count:1,
						status:2,
						name:'货品3'
					},
					{
						url:require('../images/logistics.jpg'),
						summry:'天天特价，好吃的坚果糕，自己吃，送大礼都可以，礼盒装',
						price:10,
						count:1,
						status:3,
						name:'货品4'
					},
					{
						url:require('../images/logistics.jpg'),
						summry:'天天特价，好吃的坚果糕，自己吃，送大礼都可以，礼盒装',
						price:10,
						count:1,
						status:4,
						name:'货品4'
					}
				]
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
</style>