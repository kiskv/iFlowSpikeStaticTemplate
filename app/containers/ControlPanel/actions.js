/*
 *
 * ControlPanel actions
 *
 */

import { SET_TOOLBAR_ITEMS } from './constants';

export const setToolbarItems = (path) => {
  if(path === 'grid') {
    return {
      type: SET_TOOLBAR_ITEMS,
      items: (context) => [
        {
          location: 'after',
          widget: 'dxSelectBox',
          options: {
            width: 180,
            items: [{id: 1, text: 'Фильтрация вкл.'}, {id: 2, text: 'Фильтрация выкл.'}],
            valueExpr: 'id',
            displayExpr: 'text',
            value: 1,
            onValueChanged: context.onAllowFilteringChange,
          },
        },
        {
          location: 'after',
          widget: 'dxButton',
          locateInMenu: 'auto',
          options: {
            icon: 'close',
            onClick: context.onDeletePress,
          },
        },
        {
          location: 'after',
          widget: 'dxButton',
          locateInMenu: 'auto',
          options: {
            icon: 'edit',
            onClick: context.editRow,
          },
        },
        {
          location: 'after',
          widget: 'dxButton',
          locateInMenu: 'auto',
          options: {
            icon: 'plus',
            onClick: context.addNewRow,
          },
        },
        {
          location: 'after',
          widget: 'dxButton',
          locateInMenu: 'auto',
          options: {
            icon: 'refresh',
            onClick: context.onRefresh,
          },
        },
      ],
    };
  } 
  if(path === 'edit') {
    return {
      type: SET_TOOLBAR_ITEMS,
      items: (context) => [
        {
          location: 'after',
          widget: 'dxButton',
          locateInMenu: 'auto',
          options: {
            text: 'Создать',
            onClick: context.showForm,
          },
        },
      ],
    };
  }
  return {
    type: SET_TOOLBAR_ITEMS,
  };
}
