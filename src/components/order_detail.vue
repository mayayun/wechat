<template>
	<div class="hello">
		
		<div class="container">
			<!-- <h2 class="well">订单详情</h2> -->
			<p class="margin"></p>
			<div v-if="order_detail.status>=3" class="addAddIcon" style="    line-height: 0.4rem;padding: 0.2rem;">
				<a href="#" class="blue">
					{{express.remark}}
				</a>
				<p style="font-size: 0.2rem">{{express.datetime}}</p>
			</div>
			<div else class="addAddIcon" style="    line-height: 0.4rem;padding: 0.2rem;">
				<p style="font-size: 0.2rem">{{status[order_detail.status]}}</p>
			</div>
			<p class="margin"></p>
			<ul style="padding: 0.2rem;line-height: 0.4rem;">
	        	<li>收货人：{{order_detail.customerAddress.receiver}}<span style="display: inline-block;margin: 0 0.2rem;">{{order_detail.customerAddress.phone}}</span></li>
	        	<li>收货地址：{{order_detail.customerAddress.address}}</li>
	        </ul>
	        <p class="margin"></p>
			<div class="order_detail">
				<ul>
					<li v-for="(p,key) in order_detail.commoditys">
						<dl>
							<dd ><img :src="p.commodityFormat.image" alt=""></dd>
							<dt>
								<p class="title">{{p.commodityFormat.commodity.description}}</p>
								<p class="price gray" style="color: #999">规格：{{p.commodityFormat.description}}</p>
								<p class="price">￥{{p.commodityFormat.currentPrice}}<span class="right">X{{p.count}}</span></p>
							</dt>
						</dl>
					</li>
				</ul>
			</div>
			<p class="margin"></p>
			<div class="order_pay">
				<ul style="">
					<li class="gray"><label for="">商品总价：</label>￥{{order_detail.totalPrice}}</li>
					<!-- <li class="gray"><label for="">运费：</label>￥88</li>
					<li><label for="">订单总价：</label>￥88</li> -->
					<li><label for="">实付款：</label><span class="red">￥{{order_detail.totalPrice}}</span></li>
				</ul>
			</div>
			<p class="margin"></p>
			<div class="order_pay">
				<ul>
					<li class="gray"><label for="">订单编号:</label>{{order_detail.orderNum}}</li>
					<li class="gray"><label for="">交易号:</label>--------------------</li>
					<li class="gray"><label for="">创建时间:</label>{{order_detail.createTime}}</li>
					<li class="gray"><label for="">付款时间:</label>--------------------</li>
					<li class="gray"><label for="">发货时间:</label>--------------------</li>
				</ul>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				order_detail:{},
				express : {},
				status : ['已失效','待付款','待发货','待收货','已完成','待评价']
			}
			
		},
		mounted() {
			var self = this;
			this.$http.get(`http://114.215.220.241/WeChat/orders/${this.$route.params.id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(req => {
				self.order_detail = req.data;
				console.log(self.order_detail);
				self.order_detail.commoditys.forEach(function(item,key){
					self.order_detail.commoditys[key].commodityFormat.image = "http://114.215.220.241/"+ item.commodityFormat.image
				})
				self.$http.get(`http://114.215.220.241/WeChat/queryTrack/?orderNum=${req.data.orderNum}`).then(req => {
					self.express = req.data.result.list[req.data.result.list.length-1]
				})
			})
		}
	}
</script>

<style scoped>
	.margin {
	    background: #f1eded;
	    height: 0.05rem;
	}
	.container>h2{
	    text-align: center;
	    font-size: 0.36rem;
	      line-height: 0.8rem;
	    font-weight: normal;
	  }
	.hello{
		background: #fff
	}
	.order_detail dd{
		    padding: 0 0.1rem;
		    display: inline-block;
		    width: 40%;
		    /* box-sizing: border-box; */
		    vertical-align: middle;

		}
		.order_detail dd img{
			width: 100%;
    		height: 1.5rem;
		}
		.order_detail dt{

		    display: inline-block;
		    width: 50%;
		    vertical-align: middle;
		    padding: 0.15rem;
		    /* box-sizing: border-box; */
		    height: 1.5rem;
		    /* padding-top: 0; */

		}
		.price{

    		line-height: 0.5rem;

		}
		.order_detail .title{
			overflow: hidden;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		}
		.gray{
			color: #999
		}
		.order_pay ul{
			padding: 0.2rem;line-height: 0.4rem
		}
		.order_pay ul label{
			display: inline-block;
			width: 2rem
		}
</style>