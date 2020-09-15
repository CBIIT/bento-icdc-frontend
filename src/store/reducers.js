import { combineReducers } from 'redux';
import layout from '../components/Layout/LayoutState';
import stats from '../components/Stats/StatsState';
import dashboard from '../pages/dashboard/store/dashboardReducer';
import cart from '../pages/cart/store/cartReducer';

export default combineReducers({
  layout,
  dashboard,
  cart,
  stats,
});
