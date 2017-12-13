<template>
  <div class='hello'>
    <div class='container'>
      <h2 class='well'><!-- <img src='../images/back.png' style='' alt=''> -->购物车<a href='javascript:void(0)' v-on:click='edit()'>{{!editable?'编辑':'完成'}}</a></h2>
      <ul  class='order_list' v-if="list.length>0">
        <li v-for='(p,key) in list'>
          <dl>
            <dd>
              <span style="height:0.25rem;width:0.25rem"><img style="height:auto" :src='p.url' alt='' v-on:click='check(key)'></span>
              <router-link :to="{name:'ProductDetail',params:{id:p.commodityFormat.commodity.id,customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}" style="width:77%;display:inline-block"><img style="width:95%" :src='p.commodityFormat.image' alt=''></router-link>
            </dd>
            <dt v-show='!p.editable'>
              <router-link :to="{name:'ProductDetail',params:{id:p.commodityFormat.commodity.id,customer_id:$route.params.customer_id,hotel_id:$route.params.hotel_id}}" style="display:block" class='introduce'>
               <p>{{p.description}}</p>
                <div class='introduce'>
                  <p>{{p.commodityFormat.description}}</p><p><span>￥{{p.commodityFormat.currentPrice}}</span><span>X{{p.count}}</span></p>
                </div> 
              </router-link>
              
            </dt>
            <dt v-show='p.editable'>
              <div style='text-align: center;'><img v-on:click='minus(key)' src='../images/-.png' alt='' class='left'><input type='number' v-on:change="change_shopcar(key)" v-model='p.count'><img v-on:click='add(key)'  class='right' src='../images/+.png' alt='' style='margin-right: 0'></div>
              <div v-on:click='showSpec(p.commodityFormat.commodity,key)'><span>{{p.commodityFormat.description}}</span><img class='right' src='../images/dropdown.png' alt='' style='margin-top: 0.15rem'></div>
            </dt>
          </dl>
        </li>
      </ul>
      <div v-else>还没有选购商品</div>
      
      <footer style="padding-right: 0.2rem;" class='well shopcar'><span><img v-on:click='checkAll()' :src='url' alt=''>全选</span><p >合计：<span  class='red'>￥{{sum}}</span></p><a v-on:click="balance()"  v-if='!editable' >结算</a> <a href='javascript:void(0)' v-if='editable' v-on:click='delet()'>删除</a></footer>
    </div>
    <div class='zhezhao' v-show='isZhezhao'>
      <div class='tanchu' v-show='spec'>
        <img src='../images/close.png' alt='' v-on:click='showSpec()'>
        <dl>
          <dd><div><img :src='commodityFormat.image' alt=''></div></dd>
          <dt>
            <p class='red'>￥{{commodityFormat.currentPrice}}</p>
            <p>库存{{commodityFormat.inventory}}件</p>
            <p>{{commodityFormat.description}}</p>
          </dt>
        </dl>
        <ul>
          <li>
            <div>
              <p>产品规格</p>
              <p><span @click="choose_spec(p.id,index)" :class="{active:p.isActive}" v-for="(p,index) in specList">{{p.description}}</span></p>
            </div>
          </li>
        </ul>
        <p ><a href='javascript:void(0)' v-on:click='showSpec(-1)'>确定</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      url: require('../images/unselected.png'),
      ischeckAll: false,
      sum: 0,
      editable: false,
      isZhezhao: false,
      spec: false,
      id:3,
      branchId:1,
      list: [],
      specList:[],
      commodityFormat :{},
      index: 0
    }
  },
  methods: {
    balance() {
      // alert("ok")
      var p_list = [];
      this.list.forEach(function(item,key){
        if(item.ischecked===true){
          p_list.push(item.id)
        }
      })
      if(p_list.length==0){
        alert("请选择商品！");
        return;
      }
      sessionStorage.setItem("p_list",p_list.toString());
      this.$router.push({name:"Order",params:{customer_id:this.$route.params.customer_id,hotel_id:this.$route.params.hotel_id}})
    },
    checkAll (){
      var self = this;
      var sum = 0
      this.ischeckAll = !this.ischeckAll;
      var ischeckAll = this.ischeckAll;
      this.list.forEach(function(item,key){
        if(ischeckAll===false){
          item.url = require('../images/unselected.png');
        }else{
          item.url = require('../images/selected.png');
          sum += parseFloat(item.count*item.commodityFormat.currentPrice)
        }
        self.list[key].ischecked = ischeckAll
      })

      if(this.ischeckAll === true){
        this.url = require('../images/selected.png')
      }else{
        this.url = require('../images/unselected.png')
      }
      
      this.sum = (sum).toFixed(2)
      
    },
    check(key){
      var self = this;

      if(this.list[key].ischecked === false){
        this.list[key].url = require('../images/selected.png');
        this.ischeckAll = true;
        
      }else{
        this.list[key].url = require('../images/unselected.png');
        this.ischeckAll = false;
        this.url = require('../images/unselected.png')
      }
      Vue.set(this.list,key,this.list[key]);
      this.list[key].ischecked = !this.list[key].ischecked;
      if(this.list[key].ischecked === true){
        this.list.forEach(function(item,key){
          //alert(item.ischecked===false);
          if(item.ischecked===false){
            self.ischeckAll = false;
          }
        })
        if(this.ischeckAll === true){
          this.url = require('../images/selected.png')
        }else{
          this.url = require('../images/unselected.png')
        }
      }
      
    },
    edit(){
      this.editable = !this.editable;
      var editable = this.editable;
      this.list.forEach(function(item){
        item.editable = editable
      })
    },
    choose_spec(id,index) {
      var self = this;
      self.specList.forEach(function(item,key){
        self.specList[key].isActive = false
      })
      self.specList[index].isActive = true;
      this.commodityFormat = self.specList[index];
      self.specList[index].image = "http://114.215.220.241/"+self.specList[index].image;
    },
    showSpec(){
      //alert(id);
      //alert(index);
      var id = arguments[0];
      var index = arguments[1];
      if(index!=undefined){
        this.commodityFormat = this.list[index].commodityFormat;
      }
      
      this.isZhezhao = !this.isZhezhao;
      this.spec = !this.spec;
      var self = this;
      if(id != undefined&&id!=-1){
        this.index = index;
        this.$http.get(`http://114.215.220.241/WeChat/commoditys/${id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(
        req => {
          self.specList = req.data.formats;
          self.specList.forEach(function(item,key){
            if(item.id==self.list[index].commodityFormat.id){
              //alert("ok");
              self.specList[key].isActive = true;

            }
          })
        })
      }else if(id==-1){
        var key1 = 0;
        self.specList.forEach(function(item,key){
          if(item.isActive == true){
            id = item.id;
            key1 = key
            //alert(id)
          }
        })
        var param = {
          "commodityFormat": id,
          "count": self.list[this.index].count,
          "customer": self.list[this.index].customer,
          "branch": self.list[this.index].branch
        };
        this.$http.put(`http://114.215.220.241/WeChat/shoppingCarts/${self.list[this.index].id}/`,param,{headers:{"token":sessionStorage.getItem("token")}}).then(
        req => {
          self.list[self.index].commodityFormat = self.specList[key1];
        })
      }
      
    },
    delet(){
      var self = this;
      var list = [];
      this.list.forEach(function (item,key) {
        console.log(list);
        if (item.ischecked===false) {
          list.push(item)
        }else {
          self.$http.delete(`http://114.215.220.241/WeChat/shoppingCarts/${item.id}/`,{headers:{"token":sessionStorage.getItem("token")}}).then(
          req => {
            
          })
        }
      })
      this.list = list;
    },
    minus(key){

      if (this.list[key].count===1) {
        return;
      }
      this.list[key].count--;
      this.shopcar_count(this.list[this.index].commodityFormat.id)
    },
    add(key){
      if (this.list[key].count===5) {
        return;
      }
      this.list[key].count++;
      this.shopcar_count(this.list[this.index].commodityFormat.id);
    },
    change_shopcar (key){
      //alert(this.index);
      if(this.list[key].count<1){
        return;
      }else if(this.list[key].count == ""){
        this.list[key].count = 1;
      }
      this.shopcar_count(this.list[this.index].commodityFormat.id);
    },
    shopcar_count(id){
      var self = this;
      var param = {
          "commodityFormat": id,
          "count": self.list[this.index].count,
          "customer": self.list[this.index].customer,
          "branch": self.list[this.index].branch
        };
      this.$http.put(`http://114.215.220.241/WeChat/shoppingCarts/${self.list[this.index].id}/`,param,{headers:{"token":sessionStorage.getItem("token")}}).then(
      req => {

        
      })
    }

  },
  watch: {
    list:{
      deep: true,
      handler :function(obj){
        // console.log(obj);
        // this.sum = 0;
        var sum = 0
        obj.forEach(function (item) {
          if (item.ischecked === true) {
            sum += parseFloat(item.count*item.commodityFormat.currentPrice)
          }
        })
        this.sum = (sum).toFixed(2)
        // console.log(this.sum)
      } 
    }
  },
  mounted () {
    var self = this;
    this.$http.get(`http://114.215.220.241/WeChat/customers/${this.id}/shoppingCarts/enabled/?branchId=${this.branchId}`,{headers:{"token":sessionStorage.getItem("token")}}).then(
      req => {
        self.list = req.data.results;
        self.list.forEach(function(item,key){
          self.list[key].commodityFormat.image= "http://114.215.220.241/"+self.list[key].commodityFormat.image;
          self.list[key].url = require("../images/unselected.png");
          self.list[key].ischecked = false;
        })
      })
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
  .order_list li dd img {
        margin: 0.15rem 0.05rem;
    vertical-align: middle;
    /*width: 84%;*/
    /* height: 1.7rem; */
  }
</style>

