import { mapActions, mapState } from 'vuex'
import ListService from '@/services/ListService'

export default {
	data: () => ({
		sort: 'id',
		sortDir:'asc',
		page: 0,
		pageSize: 5,
		search: '',
		editItem: null,
		validateError: {
			name:'',
			location:'',
			currency: ''
		}
	}),
	computed: {
		...mapState('Data', [ 'list' ]),

		/**
		* 	@desc Сумма всех значений currency
		*	@method totalCurrency
		**/
		totalCurrency(){
			return this.list.reduce((sum, item) => {
				return sum + parseInt(item.currency)
			}, 0)
		},

		/**
		* 	@desc Сортировка таблицы
		*	@method sortedList
		**/
		sortedList() {
			return this.list.sort((a, b) => {
				let dir = (this.sortDir === 'asc') ? 1 : -1;
				
				if(a[this.sort] < b[this.sort]) return -1 * dir;
				else if (a[this.sort] > b[this.sort]) return  1 * dir;
				else return 0;
			}).filter((row, idx) => {
				let s = this.page*this.pageSize;
				let e = (this.page+1)*this.pageSize;

				return (idx >= s && idx < e);
			}).filter((item) => {
				if(this.search === '') return true;
				else return item.name.indexOf(this.search) > -1;
			});
		},

		/**
		* 	@desc Кол-во страниц
		*	@method pageSizeModel
		**/
		pageSizeModel: {
			get() {
				return this.pageSize;
			},
			set(v) {
				this.pageSize = v;
				this.page = 0;
			}
		},

		/**
		* 	@desc Валидация поля name (при редактировании)
		*	@method pageSizeModel
		**/
		nameState() {
			let validateName = /^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/
			if(this.editItem.name.length > 2){
				if(this.editItem.name.length < 17){
					if(!validateName.test(this.editItem.name)) this.validateError.name = 'Incorrectly filled name!';
					else {
						this.validateError.name = ''
						return true
					}
				} else return this.validateError.name = 'Enter at most 16 letters'
			} else return this.validateError.name = 'Enter at least 3 letters'
		},

		/**
		* 	@desc Валидация поля location (при редактировании)
		*	@method locationState
		**/
		locationState() {
			let validateLocation = /^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/
			if(this.editItem.location.length > 2){
				if(!validateLocation.test(this.editItem.location)) this.validateError.location = 'Incorrectly filled location!';
				else {
					this.validateError.location = ''
					return true
				}
			} else return this.validateError.location = 'Enter at least 3 letters'
		},

		/**
		* 	@desc Валидация поля currency (при редактировании)
		*	@method currencyState
		**/
		currencyState() {
			let validateCurrency = /^[1-9]{1}[0-9]*$/
			if(!validateCurrency.test(this.editItem.currency)) this.validateError.currency = 'Incorrectly filled currency!';
			else {
				this.validateError.currency = ''
				return true
			}
		}
	},
	methods: {
		...mapActions('Data', [ 'getList' ]),

		/**
		* 	@desc Удаление элемента из базы
		*	@method removeItem
		**/
		async removeItem(id){
			const response = await ListService.deleteItem(id)
			this.getList()
		},

		/**
		* 	@desc Сохранение элемента (измененного при редактировании)
		*	@method saveItem
		**/
		async saveItem(){
			const response = await ListService.updateItem(this.editItem)
			this.getList()
			this.$refs.modal.hide()
		},

		/**
		* 	@desc Назначение переменной editItem
		*	@method editItemSet
		**/
		editItemSet(item){
			this.editItem = item
			this.$refs.modal.show()
		},

		/**
		* 	@desc Проверка валидации перед отправкой данных (редактирование)
		*	@method handleOk
		**/
		handleOk (evt) {
			evt.preventDefault()
			if(this.nameState && this.locationState && this.currencyState) return this.saveItem()
			else return false
		},

		/**
		* 	@desc Назначение сортировки таблицы
		*	@method handleOk
		**/
		sortBy(s) {
			if (s === this.sort) this.sortDir = (this.sortDir === 'asc') ? 'desc' : 'asc';
			else this.sortDir = 'asc';
			this.sort = s;
		},

		/**
		* 	@desc Пагинация
		*	@method hasPage
		**/
		hasPage(dir) {
			if (dir === -1 && (this.page > 0)) return true;
			if (dir ===  1 && (((this.page+1)*this.pageSize) < this.list.length)) return true;
			return false;
		},

		/**
		* 	@desc Пагинация (назад)
		*	@method hasPage
		**/
		prevPage() {
			if (this.hasPage(-1)) this.page--;
		},
		
		/**
		* 	@desc Пагинация (далее)
		*	@method hasPage
		**/
		nextPage() {
			if (this.hasPage(1)) this.page++;
		}
	},

	filters: {
		capitalize (v) {
			if (!v) return ''
			v = v.toString()
			return v.charAt(0).toUpperCase() + v.slice(1)
		}
	},
	
	mounted() {
		this.getList();
	}
}
