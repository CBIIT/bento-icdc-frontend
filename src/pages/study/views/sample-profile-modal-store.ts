import { createStore, createHook, Action } from 'react-sweet-state';

type State = {
  isModalOpen: boolean;
};

const initialState: State = {
  isModalOpen: false,
};

const actions = {
  setIsModalOpen:
    (isModalOpen: boolean): Action<State> =>
    ({ setState }) => {
      setState({
        isModalOpen: isModalOpen,
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
