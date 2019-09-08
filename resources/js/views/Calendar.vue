<template>
	<div class="row">
		<h1 class="col-md-12 center-text">Calendar</h1>
		<div class="col-md-4">
			<calendar-form
				:startingDate="startingDate"
				:endDate="endDate"
			></calendar-form>
		</div>

		<div class="col-md-8">
			<calendar-view
				:startingDate="startingDate"
				:endDate="endDate"
			></calendar-view>
		</div>
	</div>
</template>
<script type="text/javascript">
	import CalendarForm from '../components/CalendarForm.vue'
	import CalendarView from '../components/CalendarView.vue'
	import 'toastr/build/toastr.min.css'
	export default {
	    components: {
	        CalendarForm,
	        CalendarView,
	    },

	    computed : {
	    	startingDate : function(){
	    		return this.$store.getters['Calendar/startingDate'];
	    	},
	    	
	    	endDate : function(){
	    		return this.$store.getters['Calendar/endDate'];
	    	}

	    }	    
	}
</script>
<style scoped>

</style>