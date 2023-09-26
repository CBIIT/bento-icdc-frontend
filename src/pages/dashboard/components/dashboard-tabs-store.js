import { createStore, createHook } from 'react-sweet-state';

const DashboardTabsStore = createStore({
  // value of the store on initialisation
  initialState: {
    currentTab: 0,
  },
  // actions that trigger store mutation
  actions: {
    changeCurrentTab:
      (value) => ({ setState, getState }) => {
        // mutate state synchronously
        setState({
          currentTab: value || getState().currentTab + 1,
        });
      },
  },
  // optional, unique, mostly used for easy debugging
  name: 'dashboard-tabs-store',
});

const useDashboardTabs = createHook(DashboardTabsStore);

export default useDashboardTabs;
