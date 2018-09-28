import { mapActions, mapGetters } from 'vuex'

export default {
	data: () => ({
		id: null,
		error: false
	}),
	methods: {
	},
	computed: {
		...mapGetters('Data', { getItem: 'GET_ELEMENT' }),

		item(){
			if(this.id){
				let item = this.getItem(this.id);
				if(item.length) return item[0]
				else this.error = true
			} else return false
		}
	},
	mounted(){
		this.id = this.$route.params.id
	}
}
