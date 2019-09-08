const calendar = {
	namespaced: true,
	state : {
		eventTitle : null,
		startingDate : new Date(),
		endDate : new Date(new Date().getFullYear(), new Date().getMonth()+1, 0),
	},
	getters : {

		eventTitle(state){
			return state.eventTitle
		},

		startingDate(state){
			return state.startingDate;
		},

		endDate(state){
			return state.endDate;
		},
	},

	mutations : {

		setEventTitle(state, eventTitle){
			state.eventTitle = eventTitle
		},

        setStartingDate(state, startingDate){
            state.startingDate = startingDate;
        },

        setEndDate(state, endDate){
            state.endDate = endDate;
        },

	},

	actions : {

		setEventTitle(context, eventTitle){
			context.commit('setEventTitle', eventTitle)
		},

	 	setStartingDate(context, startingDate){
            context.commit('setStartingDate', startingDate);
        },

        setEndDate(context, endDate){
            context.commit('setEndDate', endDate);
        },

        saveEventandPickedDays(context, payload){

        	let success = false

        	axios.post('/api/event/save', {
                event: context.getters.eventTitle,
                days: payload
            })
            .then(function (response) {
            	success = true
                toastr.success( response.data.message );
            })
            .catch(function (error) {
                toastr.error( "The given data was invalid.")
            });

            return success

        }

	}
}

export default calendar;