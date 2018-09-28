import api from '@/services/api'

export default {
  /**
  *   @desc Запрос всех записей
  *   @method fetchList
  **/
  fetchList () {
    return api().get('list')
  },

  /**
  *   @desc Добавление новой записи
  *   @method addNewItem
  **/
  addNewItem (params) {
    return api().post('list/add', params)
  },

  /**
  *   @desc Обновление одной записи (по id)
  *   @method updateItem
  **/
  updateItem (params) {
    return api().put(`list/${params._id}`, params)
  },

  /**
  *   @desc Запрос одной записи (по id)
  *   @method getItem
  **/
  getItem (params) {
    return api().get(`list/${params._id}`)
  },

  /**
  *   @desc Удаление одной записи (по id)
  *   @method deleteItem
  **/
  deleteItem (id) {
    return api().delete(`list/remove/${id}`)
  }
}