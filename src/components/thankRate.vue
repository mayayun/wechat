<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><img src='../images/back.png'  alt=''>感谢评价<a href='#'>完成</a></h2>
			<div class='rate'>
				<div>感谢您的评价，感谢对我们的支持！</div>
				<button class='btn btn-danger'>去购物</button><button class='btn btn-danger pull-right'>继续评价</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
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