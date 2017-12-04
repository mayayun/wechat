<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><img src='../images/back.png'  alt=''>发布评价</h2>
			<div class='rate'>
				<div contenteditable = true ></div>
				<p>请你评价一下这个宝贝吧~~</p>
				<img src='../images/uploadimg.png' alt=''>
			</div>
			<p class='text-center'><router-link to='/thankRate' class='btn btn-danger'>发布</router-link></p>
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