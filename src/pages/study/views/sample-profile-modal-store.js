import { createStore, createHook } from 'react-sweet-state';

const initialState = {
    isModalOpen: false
}

const actions = {
    setIsModalOpen:
        (isModalOpen) =>
            ({ setState, getState }) => {
                setState({
                    isModalOpen: isModalOpen,
                });
            }
}

const Store = createStore({
    initialState,
    actions,
    name: 'sample-profile-modal-state',
});

export const useSampleProfileModal = createHook(Store);