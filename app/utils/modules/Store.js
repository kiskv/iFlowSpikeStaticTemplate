import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';
import Proxy from './DirectProxy';
import columns from './helper';

export const ruColumns = columns;

/**
 * Конвертируем данные из rpc для компонента фильтрации (компонент DevExtreme принимает в след. виде [{key: 'value'}])
 * @param {*} arr - массив полученных манных из rpc
 * @param {*} field - имя колонки
 */
const convertToFilterData = (arr = [], field = '') => {
    const filterData = arr.map(item => ({
        key: item[field]
    }));
    return filterData;
};

// const parseFilter = (filterEl) => {
//     let arr = [];
//     if (Array.isArray(filterEl[0])) {
//         filterEl.forEach((item) => {
//             if (Array.isArray(item[0])) {
//                 arr = arr.concat(parseFilter(item));
//             } else {
//                 arr = arr.concat(getFilterElement(item));
//             }
//         });
//         return arr;
//     }
//     arr.push(getFilterElement(filterEl));
//     return arr;
// };

const getFilterElement = (filter) => {
    if (typeof filter !== 'string') {
        return {
            property: filter[0],
            value: filter[2],
            operator: filter[1]
        };
    }
    return filter;
};

/**
 * Получить массив с фильтрацией
 * @param {Array} deFilter - фильтр от DevExpress
 */
const getFilter = (deFilter = []) => {
    let filter = [];
    if (Array.isArray(deFilter[0])) {
        deFilter.forEach((item) => {
            if (Array.isArray(item[0])) {
                filter = filter.concat(getFilter(item));
            } else {
                filter = filter.concat(getFilterElement(item));
            }
        });
        return filter;
    }
    filter.push(getFilterElement(deFilter));
    return filter;
};

// [{ property: 'C_Address1', direction: 'ASC' }]
const getSort = (deSort) => {
    const sort = [{ property: deSort[0].selector, direction: deSort[0].desc ? 'DESC' : 'ASC' }];
    return sort;
};

const select = 'LINK,N_Code,C_Name1,C_Name2,C_Name3,C_Address1,N_Debit1_WO_Peni,N_Debit1_Peni,N_Debit1,N_DebtPeriods1,N_OverDuePeriods1,D_Date_Due,D_Date_LastDue';
export default function (options = { viewId: 'pe_rd_debtors_listview', action: 'pe_rd_debtors', select }) {
    const fetchData = new Proxy(`Domain.${options.action}`);
    return {
        store: new CustomStore({
            load(loadOptions) {
                const rpcOptions = {
                    data: [{
                        viewId: options.viewId,
                        curViewId: options.viewId,
                        select: loadOptions.dataField || options.select,
                        page: (loadOptions.take + loadOptions.skip) / loadOptions.take,
                        start: loadOptions.skip,
                        limit: loadOptions.take,
                        filter: loadOptions.filter ? getFilter(loadOptions.filter) : null,
                        sort: loadOptions.sort ? getSort(loadOptions.sort) : null
                    }]
                };
                return fetchData.get(rpcOptions)
                    .then((res) => {
                        if (loadOptions.group) {
                            return {
                                data: convertToFilterData(res[0].result.records, loadOptions.dataField),
                                totalCount: res[0].result.total
                            };
                        }
                        return {
                            data: res[0].result.records,
                            totalCount: res[0].result.total
                        };
                    });
            },
            remove(data) {
                return fetchData.remove({ data: [{ id: data.LINK }] })
                    .then((res) => {
                        console.log(res);
                    });
            },
            update(options) {
                console.log(options);
                return fetchData.update({
                    data: [{
                        ...options,
                        id: options.LINK
                    }]
                })
                    .then((res) => {
                        console.log(res);
                    });
            },
            insert(data) {
                console.log(data);
            }
        })
    };
}
