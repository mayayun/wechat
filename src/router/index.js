import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import ProductDetail from '@/components/ProductDetail'
import test from '@/components/test11'
import Shopcar from '@/components/shopcar'
import Order from '@/components/order'
import Addr from '@/components/add'
import AddNewAddr from '@/components/addNewAdd'
import City from '@/components/city'
import Myorder from '@/components/myorder'
import Rate from '@/components/rate'
import ThankRate from '@/components/thankRate'
import BranchList from '@/components/branchList'
import Logistics from '@/components/logistics'
import Pull from '@/components/pull'
import Order_detail from '@/components/order_detail'


// import VDistpicker from 'v-distpicker'

// Vue.component('v-distpicker', VDistpicker)

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path: '/order_detail/:id/:hotel_id/:customer_id',
      name: 'Order_detail',
      component: Order_detail,
      meta:{
        title:'订单详情' // 标题设置在这里
      }

    },
    {
      path: '/index/:id/:customer_id',
      name: 'Index',
      component: Index,
      meta:{
        title:'首页' // 标题设置在这里
      }

    },
    {
      path: '/',
      name: 'BranchList',
      component: BranchList,
      meta:{
        title:'门店' // 标题设置在这里
      }
    },
    {
      path: '/detail/:id/:hotel_id/:customer_id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta:{
        title:'商品详情' 
      }
    },
    {
      path: '/test11',
      name: 'test11',
      component: test
    },
    {
      path: '/shopcar/:hotel_id/:customer_id',
      name: 'Shopcar',
      component: Shopcar,
      meta:{
        title:'购物车' 
      }
    },
    {
      path: '/order/:hotel_id/:customer_id',
      name: 'Order',
      component: Order,
      meta:{
        title:'我的订单' // 标题设置在这里
      }
    },
    {
      path: '/addr/:hotel_id/:customer_id',
      name: 'Addr',
      component: Addr
    },
    {
      path: '/addNewAdd/:id/:hotel_id/:customer_id',
      name: 'AddNewAddr',
      component: AddNewAddr
    },
    {
      path: '/logistics/:orderNum/:hotel_id/:customer_id',
      name: 'Logistics',
      component: Logistics,
      meta:{
        title:'查看物流' // 标题设置在这里
      }
    },
    {
      path: '/myorder/:hotel_id/:customer_id',
      name: 'Myorder',
      component: Myorder,
      meta:{
        title:'我的订单' // 标题设置在这里
      }
    },
    {
      path: '/rate/:hotel_id/:customer_id',
      name: 'Rate',
      component: Rate
    },
    {
      path: '/thankRate',
      name: 'ThankRate',
      component: ThankRate
    },
    {
      path: '/thankRate',
      name: 'ThankRate',
      component: ThankRate
    },
    {
      path: '/pull',
      name: 'Pull',
      component: Pull
    }
  ]
})
