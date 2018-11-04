import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducer from '../reducers/reducer';

const configStore = () => {
  return createStore(
    reducer,
    applyMiddleware(logger)
  );
};

export default configStore;