<template>
  <div class='hello'>
    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2> -->
    <div class='container'>
      <h2 class='well'><!-- <img  src='../images/back.png'  alt=''> -->确认订单</h2>
      <p class='margin'></p>
      <p class='addAddIcon' v-if="addr.phone == undefined"><img  src='../images/location.png' alt=''>添加收货地址<router-link :to='{name:"Addr",params:{customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}'><img src='../images/to.png' alt=''></router-link></p>
      <p class='addAddIcon' v-else>
        <img  src='../images/location.png' alt=''>
        <ul>
          <li>收货人：{{addr.receiver}}<span>{{addr.phone}}</span></li>
          <li>收货地址：{{addr.address}}</li>
        </ul>
        <router-link :to='{name:"Addr",params:{customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}'><img src='../images/to.png' alt=''></router-link>
      </p>
      <p class='margin'></p>
      <div class='order_detail'>
        <ul>
          <li><img src='../images/selected.png' alt=''>包邮</li>
          <li>
            <dl  v-for="(p,index) in p_list" style="padding:0.2rem 0;border-bottom:1px solid #eee">
              <dd><img style='width: 100%;height: auto;' :src='p.commodityFormat.image' alt=''></dd>
              <dt>
                <p>{{p.commodityFormat.commodity.description}}</p>
                <p>规格：{{p.commodityFormat.description}}</p>
                <p style='overflow: hidden;margin-top: 0.1rem'><span class='red left' >￥100</span><span class='right' style="width:auto">X{{p.count}}</span></p>
              </dt>
            </dl>
          </li>
        </ul>
      </div>
      <p class='margin'></p>
      <p class='leaveWord'>留言<input type='text' v-model="leaveMessage" placeholder='如有特殊需求，请在此备注'></p>
      <p class='margin'></p>
      <ul class='totel'>
        <li>商品金额<span>{{total}}元</span></li>
        <li>运费<span>包邮</span></li>
      </ul>
      <footer class='well'><p></p><p><span class='red' style='font-size: 0.25rem;display: inline-block;margin-right: 1rem;'>合计：{{total}}元</span><a href='javascript:void(0)' v-on:click='isPay = !isPay'>去支付</a></p></footer>
    </div>
    <div class='zhezhao' v-show='isPay'>
      
      <div class='tanchuang'>
        <span v-on:click="add_order()" class="right" style="margin:0.1rem">x</span>
        <p class='title'>支付方式</p>
        <ul>
          <li><img src='../images/alipay.png' alt=''>支付包<img src='../images/to.png' alt=''></li>
          <li><img src='../images/wechatpay.png' alt=''>微信支付<img src='../images/to.png' alt=''></li>
          <li onclick='location.href="./pay01.html"'><img src='../images/bankpay.png' alt=''>银联在线支付<img src='../images/to.png' alt=''></li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isPay: false,
      addr: {},
      p_list: [],
      leaveMessage :"",
      total : 0
    }
  },
  methods : {
    add_order() {
      //alert("ok");
      if(this.addr.receiver==undefined){
        alert("请选择地址！");
        return;
      }
      var commoditys = [];
      this.p_list.forEach(function(item){
        commoditys.push({"commodityFormat":item.commodityFormat.id,"count":item.count})
      })
      var self = this;
      var param = {
        "customer": self.$route.params.customer_id,
        "branch": self.$route.params.hotel_id,
        "customerAddress": this.addr.id,
        "leaveMessage": this.leaveMessage,
        "commoditys": commoditys,
        "trackingNumber": ""
      }
      this.$http.post("http://114.215.220.241/WeChat/orders/",param,{headers:{"token":sessionStorage.getItem('token')}}).then(req => {
        this.$router.replace(`/order_detail/${req.data.orderNum}/${this.$route.params.customer_id}/${this.$route.params.hotel_id}`)
      })
    }
  },
  mounted() {
    var self = this;
    if(sessionStorage.getItem("add")!=undefined){
      this.$http.get(`http://114.215.220.241/WeChat/customerAddresses/${sessionStorage.getItem("add")}/`,{headers:{"token":"5jpjyDrJkIzakHPRZCiVV4XDZYnB8AkE"}}).then(req=>{
        self.addr = req.data
      })
    }else{
      this.$http.get(`http://114.215.220.241/WeChat/customers/3/defaultAddress/`,{headers:{"token":sessionStorage.getItem('token')}}).then(req=>{
        self.addr = req.data
      })
    }
    if(sessionStorage.getItem("p_list")!=undefined){

      // var p = sessionStorage.getItem("p_list").split(",");
      // console.log(p);
      // p.forEach(function(item,key){
      //   self.$http.get(`http://114.215.220.241/WeChat/shoppingCarts/${item}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(req=>{
      //     self.p_list.push(req.data)
      //   })
      // })
      var p = sessionStorage.getItem("p_list").replace(/,/g,"%2C");

      self.$http.get(`http://114.215.220.241/WeChat/shoppingCart/idList/?idList=${p}`,{headers:{"token":sessionStorage.getItem('token')}}).then(req=>{
          self.p_list = req.data;
          self.p_list.forEach(function(item,key){
            self.p_list[key].commodityFormat.image = "http://114.215.220.241/" + self.p_list[key].commodityFormat.image;
            self.total += item.commodityFormat.currentPrice*item.count
            //alert(item.commodityFormat.currentPrice*item.count)
          })
          
      })
      
      //console.log(self.p_list);
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
  .moreReplay{
    transform: rotateX(180deg);
  }
  .hello{
    background: #fff
  }
  .margin{
    background: #f1eded;
    height: 0.05rem
  }

  .addAddIcon{
    line-height: 0.8rem;
  }
  .addAddIcon img:first-child{
    height: 1em;vertical-align: middle;margin: 0 0.8em;
  }
  .addAddIcon img:last-child{
    float: right;height: 1em;
    margin: 0.22rem 0.1rem;
  }
  footer{
    padding: 0.1rem
  }
</style>


