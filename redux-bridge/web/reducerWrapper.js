import { REDUX_BRIDGE_SYNC_INITIAL_STATE } from '../common/actions';

export default reducer => (state, action) => {
  if (action.type === REDUX_BRIDGE_SYNC_INITIAL_STATE) {
    return action.state;
  }

  return reducer(state, action);
}
