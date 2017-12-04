<template>
  <div class='hello'>
    <div class='container' style='padding-top: 1.4rem'>
      <div style='position:fixed;width:100%;top:0'>
        <h2 class='well'>北京宴</h2>
        <ul class='tab'>
          <li :class='{active:active}' @click="search_by_type()"><a href='#'>全部</a></li>
          <li :class='{active:p.isActive}' v-for="(p,index) in product_type"><a href='javascript:void(0)' v-on:click="search_by_type(p.id,index)">{{p.name}}</a></li>
        </ul>
      </div>
      
      <ul class='index_list'>
        <li v-for = '(p,index) in product_list'>
          <router-link :to='{ name: "ProductDetail", params: { id: p.id}}'>
            <dl>
              <dd><img :src='p.icon_list[0]' alt=''></dd>
              <dt  class='introduce'><p>{{p.description}}</p><p><span>￥{{p.lowPrice}}</span></p></dt>
            </dl>
          </router-link>
          
        </li>
        
      </ul>
      <footer class='well'>
        <router-link to='/shopcar'>
          <dl>
            <dd><img src='../images/shopcar.png' alt=''></dd>
            <dt>购物车</dt>
          </dl>
        </router-link>
        
        <router-link to='/myorder'>
          <dl>
            <dd><img src='../images/myorder.png' alt=''></dd>
            <dt>订单</dt>
          </dl>
        </router-link>
        
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      product_list: [],
      hotel_id: 1,
      product_type: [],
      active:true
    }
  },
  mounted: function () {
    //  alert('加载完成！');
    var self = this;
    this.$http.get(`http://114.215.220.241/WeChat/hotelBranchs/${this.$route.params.id}/commodityTypes/`).then(res => {
      //  this.chapterCatelog = res.data.titles.split('-')
      console.log(res.data.results);
      self.product_type = res.data.results;
      self.product_type.forEach(function(item,key){
        self.product_type[key].isActive = false;
      })

      
    }).then(res => {
      self .$http.get(`http://114.215.220.241/WeChat/hotelBranchs/${this.$route.params.id}/commoditys/`).then(res => {
        //  this.chapterCatelog = res.data.titles.split('-')
        console.log(res.data.results);
        self.product_list = res.data.results;
        self.product_list.forEach(function(item,key){
            self.product_list[key].icon_list = item.icons.split(",");
            //self.product_list[key].details_list = item.details.split(",");
            self.product_list[key].icon_list[0] = "http://114.215.220.241/"+self.product_list[key].icon_list[0];
        })
        
      })
    })
  },
  methods: {
    search_by_type (id,index) {
      var self = this;
      self.product_type.forEach(function(item,key){
        self.product_type[key].isActive = false;
      })
      self.active = false;
      if(id==undefined){
        self.active = true;
        self .$http.get(`http://114.215.220.241/WeChat/hotelBranchs/${this.$route.params.id}/commoditys/`).then(res => {
          //  this.chapterCatelog = res.data.titles.split('-')
          console.log(res.data.results);
          self.product_list = res.data.results;
          self.product_list.forEach(function(item,key){
              self.product_list[key].icon_list = item.icons.split(",");
              //self.product_list[key].details_list = item.details.split(",");
              self.product_list[key].icon_list[0] = "http://114.215.220.241/"+self.product_list[key].icon_list[0];
          })
          
        })
      }else{
        self.product_type[index].isActive = true;
        self .$http.get(`http://114.215.220.241/WeChat/hotelBranchs/${this.hotel_id}/commodityTypes/${id}/commoditys/`).then(res => {
          //  this.chapterCatelog = res.data.titles.split('-')
          console.log(res.data.results);
          self.product_list = res.data.results;
          self.product_list.forEach(function(item,key){
              self.product_list[key].icon_list = item.icons.split(",");
              //self.product_list[key].details_list = item.details.split(",");
              self.product_list[key].icon_list[0] = "http://114.215.220.241/"+self.product_list[key].icon_list[0];
          })
          
        })
      }
    }
  }
}
</script>
<style scoped>
  footer a{
    width: 50%;
    background: transparent;
    color: #000
  }
  footer a:last-child{
    background: transparent;
  }
  footer a dl{
    width: 100%
  }
</style>


