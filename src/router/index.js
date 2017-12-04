import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import ProductDetail from '@/components/ProductDetail'
import test from '@/components/test'
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


// import VDistpicker from 'v-distpicker'

// Vue.component('v-distpicker', VDistpicker)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index/:id',
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
      path: '/detail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      meta:{
        title:'商品详情' // 标题设置在这里
      }
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/shopcar',
      name: 'Shopcar',
      component: Shopcar
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{
        title:'我的订单' // 标题设置在这里
      }
    },
    {
      path: '/addr',
      name: 'Addr',
      component: Addr
    },
    {
      path: '/addNewAdd',
      name: 'AddNewAddr',
      component: AddNewAddr
    },
    {
      path: '/logistics',
      name: 'Logistics',
      component: Logistics
    },
    {
      path: '/myorder',
      name: 'Myorder',
      component: Myorder,
      meta:{
        title:'我的订单' // 标题设置在这里
      }
    },
    {
      path: '/rate',
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
