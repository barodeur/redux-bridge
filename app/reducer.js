import {
  INCR,
  SELECT_TAB,
  SHOW_CAMERA,
  SET_BARCODE_VALUE,
} from './actions';

export default (state = {
  selectedTab: 'camera',
  tabs: {
    incr: 0,
    camera: {
      value: null,
      show: true,
    }
  }
}, action) => {
  switch (action.type) {
    case INCR:
      return { ...state, tabs: {
        ...state.tabs, incr: state.tabs.incr + 1 } };
    case SELECT_TAB:
      const { tab } = action;
      return { ...state, selectedTab: tab };
    case SHOW_CAMERA:
      const { show = true } = action;
      return { ...state, tabs: {
        ...state.tabs, camera: {
          ...state.tabs.camera,
          show,
        }
      }};
    case SET_BARCODE_VALUE:
      const { value } = action;
      return { ...state, tabs: {
        ...state.tabs, camera: {
          ...state.tabs.camera,
          value,
        }
      }};
    default:
      return state;
  }
};
