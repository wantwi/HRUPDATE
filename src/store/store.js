import { createStore } from 'redux';
import { initialState } from './initial';

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':

      let keys = Object.keys(rest);

      keys.forEach(key => {
        switch (key) {
          case 'language':
            localStorage.setItem(key, rest[key])
            break;
          case 'sidebarShow':
            localStorage.setItem(key, JSON.stringify(rest[key]))
            break;
          default:
            break;
        }
      });

      return { ...state, ...rest };
      
    default:
      return { ...state, sidebarShow: state.sidebarShow !== 'responsive' ? JSON.parse(state.sidebarShow) : state.sidebarShow };
  }
}

const store = createStore(changeState)
export default store;