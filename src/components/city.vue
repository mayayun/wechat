<template>
	<v-distpicker type='mobile' @selected='onSelected'></v-distpicker>
</template>
<script>
	import VDistpicker from 'v-distpicker'
	export default{
	  components: { VDistpicker },
	  methods: {
	    onSelected(data) {
		  	//	alert(data.province + ' | ' + data.city + ' | ' + data.area)
		  	//	console.log(data)
			sessionStorage.setItem('add',data.province.value+' '+data.city.value+' '+data.area.value);
			//	this.$router.push({path:'/addNewAdd'})
	        window.history.go(-1)
     	}
    }

	}
</script>