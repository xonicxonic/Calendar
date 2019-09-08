<template>
	<section class="section" id="calendar-form">
		<form>
			<div class="form-group">
   				<label for="event">Event</label>
    			<input type="text" v-model="eventTitle" class="form-control" id="event" aria-describedby="eventHelp" placeholder="Enter Event">
  			</div>

  			<div class="form-group">
   				<label for="event">Date From</label>
    			<date-picker :value="startingDate" :config="options" @dp-hide="changeStartingDate"></date-picker>
  			</div>
  			<div class="form-group">
   				<label for="event">Date To</label>
    			<date-picker :value="endDate" :config="options" @dp-hide="changeEndDate"></date-picker>
  			</div>
  			<div class="form-check" v-for="day in days">
  				<input class="form-check-input" v-model="pickedDays" type="checkbox" :value="day" :id="day">
			    <label class="form-check-label" :for="day">
    				{{ day }}
  				</label>
		  	</div>
		  	<div class="form-group">
		  		<button type="button" class="btn btn-primary" @click="saveCalendar">Save</button>
		  	</div>
		</form>
	</section>
</template>
<script type="text/javascript">
	import 'bootstrap/dist/css/bootstrap.css';
  	// Import this component
  	import datePicker from 'vue-bootstrap-datetimepicker';
  
  	// Import date picker css
  	import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
	export default {
		props : ['startingDate', 'endDate'],
		components: {
      		datePicker
    	},
		data () {
  			return {
  				eventTitle : null,
        		dateFrom: new Date(),
        		dateTo: null,
        		days : ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
        		pickedDays : [],
        		options: {
		          	format: 'DD/MM/YYYY',
		        }       
 			}
		},
		methods : {
			saveCalendar : function() {

				if (this.startingDate > this.endDate){
					toastr.error("Date To must not be before Date From.");

					return false;
				}

				if (this.eventTitle === null || this.eventTitle === ''){
					toastr.error("Event cannot be empty.");

					return false;
				}

				if (this.pickedDays === undefined || this.pickedDays.length == 0){
					toastr.error("You must pick days.");

					return false;
				}

				this.$store.dispatch('Calendar/setEventTitle',this.eventTitle)
				this.$root.$emit('calendar-eventing' , this.pickedDays);
			},

			changeStartingDate : function(event) {

				var dateParts = event.target.value.split("/");

				// month is 0-based, that's why we need dataParts[1] - 1
				var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 

				this.$store.dispatch('Calendar/setStartingDate',dateObject)
			},

			changeEndDate : function(event){
				var dateParts = event.target.value.split("/");

				// month is 0-based, that's why we need dataParts[1] - 1
				var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); 

				this.$store.dispatch('Calendar/setEndDate',dateObject)
			}
		}
	}
</script>
<style type="text/css" scoped>

</style>