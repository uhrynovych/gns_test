import ListService from '@/services/ListService'

const Data = {
	namespaced: true,
	state: {
		list: null,
	},
	// Getters
	getters: {
		/**
		*   @desc Выбор одного элемента по id из state.list
		*   @method GET_ELEMENT
		**/
		GET_ELEMENT: state => id => {
			return state.list.filter(item => item._id === id);
		}
	},

	// Mutations
	mutations: {
		/**
		*   @desc Назначение переменной state.list
		*   @method UPDATE_LIST
		**/
		UPDATE_LIST(state, value){
			state.list = value
		}
	},

	// Actions
	actions: {
		/**
		*   @desc Запрос списка
		*   @method getList
		**/
		async getList({state, commit}){
			const response = await ListService.fetchList()
			commit('UPDATE_LIST', response.data.list)
		}
	}
}

export default Data