<template>
	<div class='hello'>
    	<div class='container'>
			<div class='well'>
				<div class='swiper-container'>
		          <div class='swiper-wrapper'>
		              <div class='swiper-slide' v-for="(p,key) in product_detail"><img :src='p' alt=''></div>
		              <!-- <div class='swiper-slide'><img src='../images/banner.png' alt=''></div>
		              <div class='swiper-slide'><img src='../images/banner.png' alt=''></div> -->
		          </div>
		          <div class='swiper-pagination'></div>
		          <!-- <div class='swiper-button-prev'></div>
		          <div class='swiper-button-next'></div> -->
		          <!-- <div class='swiper-scrollbar'></div> -->
		        </div>

			</div>
		</div>
        
        
	</div>
</template>
<script>
	export default {
		data () {
			return {
				product_detail: []
			}
		},
		mounted () {
			new Swiper ('.swiper-container', {
	          //loop: true,
	          pagination: '.swiper-pagination',
	          paginationClickable :true,
	          //nextButton: '.swiper-button-next',
	          //prevButton: '.swiper-button-prev',
	          // scrollbar: '.swiper-scrollbar',
	          autoplay: 3000,
	          autoplayDisableOnInteraction : false,
	          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          	  observeParents:true
	        });
	        var self = this;
	        setTimeout(function(){
	        	self.product_detail = ["../images/banner.png","../images/banner.png","../images/banner.png"]
	        },1000)
	        
		}
	}
</script>