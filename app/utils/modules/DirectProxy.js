/**
 * @example
 * const data = new Proxy('Domain.PE_RD_Debtors').get({
 *  data: [{
 *      viewId: 'pe_rd_debtors_listview',
 *      curViewId: 'pe_rd_debtors_listview',
 *      select: 'LINK,N_Code,C_Name1,C_Name2,C_Name3,C_Address1,N_Debit1_WO_Peni,N_Debit1_Peni,N_Debit1,N_DebtPeriods1,N_OverDuePeriods1,D_Date_Due,D_Date_LastDue',
 *      page: 1,
 *      start: 0,
 *      limit: 25,
 *      sort: [{
 *          property: 'N_Debit1',
 *          direction: 'DESC'
 *      }]
 *  }]
 * });
 *
 * data.then((res) => {
 *      console.log(res);
 * });
 */
class DirectProxy {
    action = undefined;

    RPC_URL = 'http://dev-ws-v-05.compulink.local/iflow/robert/rpc';

    constructor(action) {
      this.action = action;
    }

    /**
     * Получение данных
     * @param {any} options дополнительные опции
     * @example
     * get({...})
     */
    get(options) {
      return this.request(Object.assign({
        method: 'Query',
      }, options));
    }

    /**
     * добавление записей
     * @param {any} options дополнительные опции
     * @example
     * add({
     *      data:[{ id: 1, text: 'name' }]
     * })
     */
    add(options) {
      return this.request(Object.assign({
        method: 'Add',
      }, options));
    }

    /**
     * обновление записей
     * @param {any} options дополнительные опции
     * @example
     * update({
     *      data:[{ id: 1, text: 'name' }]
     * })
     */
    update(options) {
      return this.request(Object.assign({
        method: 'Update',
      }, options));
    }

    /**
     * Удаление записей
     * @param {any} options дополнительные опции
     * @example
     * remove({
     *      data:[{ id: 1 }]
     * })
     */
    remove(options) {
      return this.request(Object.assign({
        method: 'Delete',
      }, options));
    }

    /**
     * Запросы к серверу
     * @param {any} options дополнительные опции
     * @returns {Promise}
     */
    request(options) {
      const content = JSON.stringify(Object.assign({
        action: this.action,
        tid: 0,
        type: 'rpc',
      }, options || {}));
      const response = fetch(this.RPC_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: content,
      });
      return response.then(res => res.json());
    }
}

export default DirectProxy;
