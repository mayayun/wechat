<template>
	<div class='hello'>
		<div class='container'>
			<h2 class='well'><img src='../images/back.png' style='' alt=''>地址管理<a href='javascript:void(0)' v-on:click='editable = !editable'>{{!editable?'管理':'修改'}}</a></h2>
			<p class='margin'></p>
			<ul class='add_List'>
				<li v-for='(p,key) in list'>
					<dl>
						<dd>{{p.name}}<span>{{p.phone}}</span></dd>
						<dt><span v-if='p.isdefault&&!editable'>(默认地址)</span>{{p.addr}}</dt>
						<dt v-if='editable'><img v-show='p.isdefault&&editable' src='../images/choose.png' alt=''><img v-on:click='chooseDefault(key)' v-show='!p.isdefault&&editable' src='../images/unchoose.png' alt=''><span>设置为默认地址</span><a v-on:click='dele(key)' href='javascript:void(0)' class='right'>删除</a> <a class='right' href='#' style='margin: 0 0.1rem;'>编辑</a></dt>
					</dl>
				</li>
			</ul>
			<footer class='well' v-show='editable'>
				<p class='addAdd'><router-link to='/addNewAdd'><img src='../images/add01.png' alt=''>新增地址</router-link></p>
			</footer>
		</div>
	</div>
</template>
<script>
	export default{
		name: 'Addr',
		data () {
			return {
				editable:false,
				list: [
					{
						name: 'name1',
						phone: '13224500908',
						addr: '地址1地址1地址1地址1地址1地址1地址1地址1地址1',
						editable: false,
						isdefault: true
					},
					{
						name: 'name2',
						phone: '13224500908',
						addr: '地址2地址1地址1地址1地址1地址1地址1地址1地址1',
						editable: false,
						isdefault: false
					},
					{
						name: 'name3',
						phone: '13224500908',
						addr: '地址3地址1地址1地址1地址1地址1地址1地址1地址1',
						editable: false,
						isdefault: false
					}
				]
			}
		},
		methods: {
			chooseDefault(index){
				this.list.forEach(function(item){
					item.isdefault = false;
				})
				this.list[index].isdefault = true
			},
			dele(index){
				this.list.splice(index,1)
			}
		}
	}
</script>
<style scoped>
	footer a:last-child{
		background: transparent;
		color: #000
	}
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
</style>