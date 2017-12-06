<template>
	<div class="hello">
		<p>请选择门店进行购物</p>
		<ul>
			<li v-for="(p,key) in hotel_list"><router-link :to='{ name: "Index", params: { id: p.hotel}}'>{{p.name}}</router-link></li>
		</ul>
	</div>
</template>
<script>
	export default{
		data () {
			return {
				hotel_id:1,
				hotel_list:[]
			}
		},
		mounted () {
			var href = location.href;
			var indexFrom = location.href.indexOf("?")+1;
			var indexTo = location.href.indexOf("#");
			href = href.slice(indexFrom,indexTo);
			href = href.split("&");
			href.forEach(function(item,key){
				href[key] = item.split("=");
				console.log(item);
			})
			var code = "";
			var state = "";
			var self = this;
			this.$http.get(`http://114.215.220.241/WeChat/hotels/${this.hotel_id}/allBranchs/`)
								 .then(res =>{
								 	self.hotel_list = res.data.results;
								 })
			this.$http.get(`http://114.215.220.241/WeChat/webAccessToken/?code=${href[0][1]}&state=${href[1][1]}`)
			    .then(res =>{
			    	console.log(res);
			    	//openid = res.data.openid;
					self.$http.post(`http://114.215.220.241/WeChat/customers/login/`,{openid:res.data.openid})
						 .then(res =>{
						 	//alert(res.data.token);
						 	sessionStorage.setItem("token",res.data.token)
						 })
			  		}
				)
		}

	}
</script>
<style scoped>
	.hello{
		background: #fff;
	    width: 70%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    margin: auto;
	    max-height: 6rem;
	    min-height: 3rem;
		overflow: auto;
	}
	.hello li{
		padding: 0 0.3rem;
	    line-height: 0.8rem;
	    text-align: center;
	}
	.hello li:nth-child(2n){
		background: #efefef69
	}
	.hello p{
		text-align: center;
	    line-height: 1rem;
	    border-bottom: 1px solid;
	}
</style>