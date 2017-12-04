<template>
  <div class='hello'>
    <div class='container'>
      <h2 class='well'><img src='../images/back.png' style='' alt=''>购物车<a href='javascript:void(0)' v-on:click='edit()'>{{!editable?'编辑':'完成'}}</a></h2>
      <ul  class='order_list'>
        <li v-for='(p,key) in list'>
          <dl>
            <dd><span><img src='../images/unselected.png' alt='' v-on:click='check(key)'></span><img src='../images/logistics.jpg' alt=''></dd>
            <dt v-show='!p.editable'>
              <p>名字</p>
              <div class='introduce'>
                <p>很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦</p><p><span>￥10</span><span>X{{p.count}}</span></p>
              </div>
            </dt>
            <dt v-show='p.editable'>
              <div style='text-align: center;'><img v-on:click='minus(key)' src='../images/-.png' alt='' class='left'><input type='text' v-model='p.count'><img v-on:click='add(key)'  class='right' src='../images/+.png' alt='' style='margin-right: 0'></div>
              <div v-on:click='showSpec()'><span>规格1</span><img class='right' src='../images/dropdown.png' alt='' style='margin-top: 0.15rem'></div>
            </dt>
          </dl>
        </li>
      </ul>
      
      <footer style="padding-right: 0.2rem;" class='well shopcar'><span><img v-on:click='checkAll()' :src='url' alt=''>全选</span><p v-if='!editable'>合计：<span  class='red'>￥{{sum}}</span></p><router-link to='/order' v-if='!editable' >结算</router-link> <a href='javascript:void(0)' v-if='editable' v-on:click='delet()'>删除</a></footer>
    </div>
    <div class='zhezhao' v-show='isZhezhao'>
      <div class='tanchu' v-show='spec'>
        <img src='../images/close.png' alt='' v-on:click='showSpec()'>
        <dl>
          <dd><div><img src='../images/index_01.jpg' alt=''></div></dd>
          <dt>
            <p class='red'>￥100</p>
            <p>库存40件</p>
            <p>请选择口味</p>
          </dt>
        </dl>
        <ul>
          <li>
            <div>
              <p>产品规格</p>
              <p><span>规格1</span><span>规格2</span><span>规格3</span></p>
            </div>
          </li>
        </ul>
        <p ><a href='javascript:void(0)' v-on:click='showSpec()'>确定</a></p>
      </div>
    </div>
  </div>
</template>

<script>
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
      list: [
        {
          name: '水果干1',
          summry: '很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦很好吃的水果哦',
          price: '100',
          ischecked: false,
          url: require('../images/unselected.png'),
          editable: false,
          num: 2
        },
        {
          name: '水果干2',
          summry: '很好吃的水果哦',
          price: '100',
          ischecked: false,
          url: require('../images/unselected.png'),
          editable: false,
          num: 1
        }
      ]
    }
  },
  methods: {
    checkAll (){
      this.ischeckAll = !this.ischeckAll;
      var ischeckAll = this.ischeckAll;
      this.list.forEach(function(item){
        if(ischeckAll===false){
          item.url = require('../images/unselected.png');
        }else{
          item.url = require('../images/selected.png')
        }
        item.ischecked = ischeckAll
      })
      if(this.ischeckAll === true){
        this.url = require('../images/selected.png')
      }else{
        this.url = require('../images/unselected.png')
      }
      
    },
    check(key){
      // alert('ok');
      if(this.list[key].ischecked === false){
        this.list[key].url = require('../images/selected.png');
        // this.list[key].ischecked = true
      }else{
        // this.list[key].ischecked = false
        this.list[key].url = require('../images/unselected.png')
      }
      this.list[key].ischecked = !this.list[key].ischecked
    },
    edit(){
      this.editable = !this.editable;
      var editable = this.editable;
      this.list.forEach(function(item){
        item.editable = editable
      })
    },
    showSpec(){
      this.isZhezhao = !this.isZhezhao;
      this.spec = !this.spec
    },
    delet(){
      // alert('ok');
      var list = [];
      this.list.forEach(function (item,key) {
        console.log(list);
        if (item.ischecked===false) {
          list.push(item)
        }else {

        }
      })
      this.list = list;
    },
    minus(key){
      if (this.list[key].num===1) {
        return;
      }
      this.list[key].num--
    },
    add(key){
      if (this.list[key].num===5) {
        return;
      }
      this.list[key].num++
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
            sum += parseFloat(item.price)
          }
        })
        this.sum = (sum).toFixed(2)
        // console.log(this.sum)
      } 
    }
  },
  mounted () {
    var self = this;
    this.$http.get(`http://114.215.220.241/WeChat/customers/${this.id}/shoppingCarts/enabled/?branchId=${this.branchId}`,{headers:{"token":"fDthAHEOoErIejVehoCN6pBmSqh/ZXaH"}}).then(
      req => {
        self.list = req.data.results;
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
</style>

