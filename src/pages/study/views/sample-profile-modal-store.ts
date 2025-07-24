import { createStore, createHook, Action } from 'react-sweet-state';

type State = {
  isModalOpen: boolean;
  currentTab: string;
};

const initialState: State = {
  isModalOpen: false,
  currentTab: '1',
};

const actions = {
  setIsModalOpen:
    (isModalOpen: boolean): Action<State> =>
    ({ setState }) => {
      setState({
        isModalOpen,
      });
    },
  setCurrentTab:
    (currentTab: string): Action<State> =>
    ({ setState }) => {
      setState({
        currentTab,
      });
    },
};

type Actions = typeof actions;

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: 'sample-profile-modal-state',
});

export const useSampleProfileModal = createHook(Store);
