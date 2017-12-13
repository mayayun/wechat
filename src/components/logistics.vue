<template>
	<div class="hello">
		<div class="container">
			<!-- <h2 class="well"><img src="../images/back.png"  alt="">查看物流</h2> -->
			<div class="outer">
				<!-- <dl>
					<dd><img src="../images/logistics.jpg" alt=""></dd>
					<dt>
						<p class="orange">已签收</p>
						<p>{{express.company}}：{{express.no}}</p>
						<p>官方电话：<span class="blue">95311</span></p>
					</dt>
				</dl> -->
				<p style="padding:0.2rem 0.3rem">{{express.company}}：{{express.no}}</p>
			</div>
			<div class="outer logistics_detail">
				<ul>
					<!-- <li>
						<dl>
							<dd>10-07</dd>
							<dt class="orange"><p>已签收</p></dt>
						</dl>
					</li> -->
					<li v-for="(p,index) in express.list">
						<dl>
							<dd style="font-size: 0.1rem;text-align: right;padding: 0 0.1rem;"><p style="font-size: 0.3rem;padding:0">{{p.datetime | date_formate}}</p>{{p.datetime | m_formate}}</dd>
							<dt><p>{{p.remark}}</p></dt>
						</dl>
					</li>
					
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				express: []
			}
		},
		mounted () {
			var self = this;
			this.$http.get(`http://114.215.220.241/WeChat/queryTrack/?orderNum=${this.$route.params.orderNum}`).then(req => {   
				self.express = req.data.result;
				self.express.list.sort(function(a,b){
					return new Date(b.datetime)-new Date(a.datetime)
				})
			})
		},
		filters : {
			date_formate(str){
				var arr = str.split(" ");
				str = arr[0];
				str = str.slice(5)
				return str;
				//arr[1].splice(0,5);
			},
			m_formate(str){
				var arr = str.split(" ");
				str = arr[1];
				str = str.slice(0,5);
				return str;
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
	  .logistics_detail li:first-child{
	  	color:orange;
	  }
</style>