import { createStore, createHook, Action } from 'react-sweet-state';

type State = {
  currentTab: number;
};

const actions = {
  changeCurrentTab:
    (value: number): Action<State> =>
    ({ setState }) => {
      // mutate state synchronously
      setState({
        currentTab: value,
      });
    },
};

const initialState: State = {
  currentTab: 0,
};

type Actions = typeof actions;

const DashboardTabsStore = createStore<State, Actions>({
  // value of the store on initialisation
  initialState,
  // actions that trigger store mutation
  actions,
  // optional, unique, mostly used for easy debugging
  name: 'dashboard-tabs-store',
});

const useDashboardTabs = createHook(DashboardTabsStore);

export default useDashboardTabs;
