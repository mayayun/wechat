<template>
  <div class='hello'>
    <div class='container'>
      <h2 class='well'><img onclick='history.go(-1)' src='../images/back.png' style='' alt=''>商品详情</h2>
      <div class='well'>
        <div class='swiper-container'>
          <div class='swiper-wrapper'>
              <div class='swiper-slide' v-for="(p,key) in product_detail.icon_list"><img :src='p' alt=''></div>
              <!-- <div class='swiper-slide'><img src='../images/banner.png' alt=''></div>
              <div class='swiper-slide'><img src='../images/banner.png' alt=''></div> -->
          </div>
          <div class='swiper-pagination'></div>
          <div class='swiper-button-prev'></div>
          <div class='swiper-button-next'></div>
          <div class='swiper-scrollbar'></div>
        </div>
        
        <div class='introduce'>
          <!-- <p>{{product_detail.image1}}</p> -->
          <p>{{product_detail.description}}</p>
          <p><span>￥{{product_detail.originalPrice}}</span></p>
        </div>
      </div>

      <div class='evaluate well'>
        <ul>
          <li v-on:click='showSpec()' style='line-height:0.5rem;border-bottom:1px solid #eee'>产品规格 <img style='height:0.3rem;float:right' src='../images/to.png' alt=''></li>
          <li v-on:click='productParam()' style='line-height:0.5rem'>产品参数 <img src='../images/to.png' alt='' style='height:0.3rem;float:right'></li>
        </ul>
      </div>
      <div class='evaluate well'> 
        <h3>评价</h3>
        <ul>
          <li>
            <p><i></i>睡谁输</p>
            <p class='time'>2017-09-08 15:09</p>
            <p>宝贝到的很快，看了一下，非常满意，包装也是很精美。里面的吃的好吃的不得了，给一万个赞</p>
          </li>
          <li>
            <p><i></i>睡谁输</p>
            <p class='time'>2017-09-08 15:09</p>
            <p>宝贝到的很快，看了一下，非常满意，包装也是很精美。里面的吃的好吃的不得了，给一万个赞</p>
          </li>
        </ul>
        <p><img v-on:click='changeClass()' :class='{moreReplay:more}' src='../images/collapse.png'/></p>
      </div>
      <div class='infoDetail'>
        <img v-for="(p,key) in product_detail.details_list" :src='p' alt=''>
      </div>

      <footer class='well'><router-link to='/shopcar'><img src='../images/shopcart.png' alt=''></router-link><a href='javascript:void(0)' v-on:click='showSpec(0)'>加入购物车</a><transition name='fade'><p v-show='shop_success'>加入购物车成功</p></transition><a href='./sure_order.html'>立即购买</a></footer>
    </div>
    <div class='zhezhao' v-show='isZhezhao'>
      <div class='tanchu' v-show='spec'>
        <img src='../images/close.png' alt='' v-on:click='showSpec()'>
        <dl>
          <dd>
            <div><img v-if="product_detail.check_format==undefined" :src='product_detail.image' alt=''><img :src="product_detail.check_format.image" v-else alt="">
              <!-- <img src="../images/to.png" alt=""> -->
            </div>
          </dd>
          <dt>
            <p class='red' v-if="product_detail.check_format==undefined">￥{{(product_detail.min+"-"+product_detail.max)}}</p>
            <p class='red' v-else>￥{{product_detail.check_format.currentPrice}}</p>
            <p>库存{{product_detail.check_format==undefined?product_detail.inventory:product_detail.check_format.inventory}}件</p>
            <p>{{product_detail.check_format==undefined?"请选择口味":product_detail.check_format.description}}</p>
          </dt>
        </dl>
        <ul>
          <li>
            <div>
              <p>产品规格</p>
              <p><span :class="{ active: p.isActive }" v-on:click="choose_formate(key)" v-for="(p,key) in product_detail.formats">{{p.description}}</span></p>
            </div>
          </li>
          <li>
            购买数量 <span class='left'><img v-on:click='changeNum("m")' src='../images/-.png' alt=''><input v-model="product.count" type='text'><img src='../images/+.png' alt='' v-on:click='changeNum("a")'></span>
          </li>
        </ul>
        <p v-show='!shopcar'><button>立即购买</button><button v-on:click='showSpec(1)'>加入购物车</button></p>
        <p v-show='shopcar'><a href='javascript:void(0)' v-on:click='showSpec(1)'>确定</a></p>
      </div>
      <div class='tanchu' v-show='product_param'>
        <p style='font-size: 0.3rem;text-align: center;line-height: 0.8rem;'>产品参数</p>
        <ul>
          <li><label for=''>生产日期开始</label><span>{{product_detail.productionDateFrom}}</span></li>
          <li><label for=''>生产日期结束</label><span>{{product_detail.productionDateTo}}</span></li>
          <li><label for=''>净含量</label><span>{{product_detail.netWeight }}</span></li>
          <li><label for=''>包装方式</label><span>{{product_detail.packing }}</span></li>
          <li><label for=''>品牌</label><span>{{product_detail.brand }}</span></li>
          <li><label for=''>产地</label><span>{{product_detail.origin }}</span></li>
          <li><label for=''>厂名</label><span>{{product_detail.factoryName  }}</span></li>
          <li><label for=''>厂址</label><span>{{product_detail.factoryAddress  }}</span></li>
          <li><label for=''>配料</label><span>{{product_detail.ingredients  }}</span></li>
          <li><label for=''>储存方式</label><span>{{product_detail.storageMethod   }}</span></li>
          <li><label for=''>保质期</label><span>{{product_detail.shelfLife }}</span></li>
        </ul>
        <p><a href='javascript:void(0)' v-on:click='productParam()'>完成</a></p>
      </div>
    </div>
  </div>
</template>

<style src='../js/Swiper-3.4.2/css/swiper.min.css'></style>
<script src='../js/Swiper-3.4.2/js/swiper.min.js'></script>
<script>
  //  import Swiper from '../js/Swiper-3.4.2/js/swiper.min.js'
  //  require('../js/Swiper-3.4.2/css/swiper.min.css')
  import Swiper from 'swiper';
  import Vue from 'vue'

  export default {
    name: 'ProductDetail',
    data () {
      return {
        product: {
          "commodityFormat": "",
          "count": 1,
          "branch":1
        },
        msg: 'Welcome to Your Vue.js App',
        more: true,
        spec: false,
        product_param: false,
        isZhezhao: false ,
        shopcar : false,
        shop_success: false,
        product_detail: {}
        
      }
    },
    mounted () {
      console.log(this.$route.params.id)
      var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable :true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        // scrollbar: '.swiper-scrollbar',
        autoplay: 3000,
        autoplayDisableOnInteraction : false
      });
      var self = this;
      this.$http.get(`http://114.215.220.241/WeChat/commoditys/${this.$route.params.id}/`).then(res => {
        //console.log(res)
        self.product_detail = res.data;
        self.product_detail.icon_list = self.product_detail.icons.split(",");
        self.product_detail.details_list = self.product_detail.details.split(",");
        self.product_detail.icon_list.forEach(function(item,key){
            self.product_detail.icon_list[key] = "http://114.215.220.241/"+item;
        })
        self.product_detail.details_list.forEach(function(item,key){
            
            self.product_detail.details_list[key] = "http://114.215.220.241/"+item;
        })
        self.product_detail.image = self.product_detail.icon_list[0];
        self.product_detail.min = self.product_detail.formats[0].currentPrice;
        self.product_detail.max = self.product_detail.formats[0].currentPrice;
        self.product_detail.inventory = self.product_detail.formats[0].inventory;
        self.product_detail.formats.forEach(function(item,key){
            if(item.currentPrice<self.product_detail.min){
              self.product_detail.min = item.currentPrice;
            }
            if(item.currentPrice>self.product_detail.max){
              self.product_detail.max = item.currentPrice;
            }
            self.product_detail.inventory =item.inventory+self.product_detail.inventory;
            self.product_detail.formats[key].image = "http://114.215.220.241/"+item.image;
        })
        //self.product_detail.defaule.image = self.product_detail.formats[0].image;
        console.log(self.product_detail);

      })
    },
    updated(){
       // alert("updated");
    },
    destroyed () {
       // alert("destroyed")
    },
    methods: {
      changeClass(){
        this.more = !this.more;
      },
      showSpec(){
        if(arguments.length != 0){
          
          this.shopcar = true;
        }else{
          this.shopcar = false;
        }
        if(arguments[0]==1){
          if(this.product_detail.check_format === undefined){
            alert("请选择商品属性！");
            return;
          }
          var self = this;
          this.product.commodityFormat = this.product_detail.check_format.id;
          this.$http.post(`http://114.215.220.241/WeChat/shoppingCarts/`,this.product,{headers:{"token":sessionStorage.getItem("token")}})
             .then(res =>{
                self.shop_success = true;
          
                var timer = setTimeout(function(){
                  self.shop_success = false;
                  timer = null
                },1000);
             })
        }
        this.isZhezhao= !this.isZhezhao;
        this.spec= !this.spec;
      },
      productParam(){
        this.isZhezhao= !this.isZhezhao;
        this.product_param= !this.product_param;
        if(this.product_param==true){
          
        }
      },
      choose_formate (index) {
        var self = this;
        this.product_detail.formats.forEach(function(item,key){
          self.product_detail.formats[key].isActive = false;
        })
        this.product_detail.formats[index].isActive = true;
        var p = this.product_detail.formats[index];
        Vue.set(this.product_detail.formats,index,p)
        this.product_detail.check_format = this.product_detail.formats[index];
        console.log(this.product_detail.check_format);
        // console.log(this.product_detail.check_format==undefined);
      },
      changeNum(key){
        //alert(this.product.count+key);
        if(key === "a"){
          if(this.product.count===99){
            return;
          }
          this.product.count++;
        }else{
          if(this.product.count===1){
            return;
          }
          this.product.count--;
        }
        //alert(this.product.count);
      }
    }
  }
</script>



<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .container>h2{
    text-align: center;
    font-size: 0.36rem;
      line-height: 0.8rem;
    font-weight: normal;
  }
  .moreReplay{
    transform: rotateX(180deg);
  }
  footer>p{
    position: absolute;
    top: -0.5rem;
    background: rgba(255,255,255,0.8);
    padding: 0.1rem 0.2rem;
    border-radius: 43%;
    left: 29%;
  }
  footer a img{
    height: 0.5rem
  }
  footer{
    padding: 0.1rem
  }
</style>
