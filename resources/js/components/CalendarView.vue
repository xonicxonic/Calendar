<template>
	<section class="section" id="calendar-view">
		<div v-for="(days, month) in listOfDays">
			<div  v-for="(day, index) in days" v-if="day !== undefined">
				{{ month + ' ' + index + ' - ' + day }}
				<div class="col-md-12 message alert alert-success" role="alert" v-if="pickedDays.includes(day)"> {{ eventTitle }} </div>
				<hr>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
	export default {
		props : ['startingDate', 'endDate'],
		data(){
			return {
				eventTitle : null,
				pickedDays : [],
	    		months : moment.months(),
	    		listOfDays : {},
	    		toBeSavedDays : []
			}
 		},
		created : function (){
			this.getDaysArray();
		},	
		mounted() {
			let that = this;
		    this.$root.$on('calendar-eventing',function( payload ){
	            that.pickedDays = payload;
        		that.getDaysArray();
		    })
		},
		methods : {
			getDaysArray : function(){

				this.eventTitle = this.$store.getters['Calendar/eventTitle'];	
				this.toBeSavedDays = [];

				var names = [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ];
				var date = new Date(this.startingDate.getFullYear(), this.startingDate.getMonth() , this.startingDate.getDate());
				var result = {}

				while (date.getMonth() <= this.endDate.getMonth()) {
					// break the while loop if the date exceeds the Dat To
					if (date.getMonth() == this.endDate.getMonth() && date.getDate() > this.endDate.getDate() ){
						break;
					}
					// Add Key to be used as Month in display
					if (result[ this.months[ date.getMonth() ] ] === undefined) {
						result[ this.months[ date.getMonth() ] ] = [];
					}

					// Creates an array to be passed to the backend to be saved on database
					if (this.pickedDays.includes(  names[date.getDay()] )){
						this.toBeSavedDays.push( date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() );
					}

					// Push the date to an array
					result[ this.months[ date.getMonth() ] ][ date.getDate() ] = names[date.getDay()]
				    date.setDate(date.getDate() + 1);
				}


				if (this.eventTitle !== null){
					this.$store.dispatch('Calendar/saveEventandPickedDays',this.toBeSavedDays)
				}
				
				this.listOfDays = result;
			}
		}
	}
</script>
<style type="text/css" scoped>
	hr {
	  	margin-top: 1rem;
	  	margin-bottom: 1rem;
	  	border: 0;
	  	border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
</style>