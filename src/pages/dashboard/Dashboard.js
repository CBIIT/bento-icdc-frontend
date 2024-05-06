import React from "react";
import store from '../../store';

const Dashboard = () => {
    store.dispatch({
        type: 'test-redux',
        value: 'storeconfigure-test'
    });
    console.log('dashboard');
    return (
        <>
            <h2>Dashboard page</h2>
        </>
    );
};

export default Dashboard;
