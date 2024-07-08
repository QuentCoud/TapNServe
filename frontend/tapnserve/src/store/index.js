import { createStore } from 'vuex';
import user from './user';
import restaurant from './restaurant';

const store = createStore({
  modules: {
    user,
    restaurant
  },
});

export default store;