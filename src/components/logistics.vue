<template>
	<div class="hello">
		<div class="container">
			<h2 class="well"><img src="../images/back.png"  alt="">查看物流</h2>
			<div class="outer">
				<dl>
					<dd><img src="../images/logistics.jpg" alt=""></dd>
					<dt>
						<p class="orange">已签收</p>
						<p>中通快递：1234567891010</p>
						<p>官方电话：<span class="blue">95311</span></p>
					</dt>
				</dl>
			</div>
			<div class="outer logistics_detail">
				<ul>
					<li>
						<dl>
							<dd>10-07</dd>
							<dt class="orange"><p>已签收</p></dt>
						</dl>
					</li>
					<li>
						<dl>
							<dd>10-07</dd>
							<dt><p>北京海淀派件员已揽收：谁谁谁</p><p><span class="blue">13000000000</span>正在为您派件</p></dt>
						</dl>
					</li>
					<li>
						<dl>
							<dd>10-07</dd>
							<dt><p>到达北京市运转中心</p></dt>
						</dl>
					</li>
					<li>
						<dl>
							<dd>10-07</dd>
							<dt><p>已揽件</p>
							<p>（广州市）中通快递&nbsp;&nbsp;广东省广州市啥啥啥收件员&nbsp;</p></dt>
						</dl>
					</li>
					<li>
						<dl>
							<dd>10-07</dd>
							<dt><p>已发货</p>
							<p>等待包裹揽收</p></dt>
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