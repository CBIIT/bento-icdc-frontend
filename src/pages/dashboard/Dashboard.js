import React from "react";
import { withStyles } from "@material-ui/styles";
import store from '../../store';

const Dashboard = ({
  classes
}) => {
    store.dispatch({
        type: 'test-redux',
        value: 'storeconfigure-test'
    });
    console.log('dashboard');
    return (
        <>
            <h2 className={classes.mainContrainer}>Dashboard page</h2>
        </>
    );
};

const styles = () => ({
    mainContrainer: {
        color: '#d5d5d5',
    },
});

export default withStyles(styles)(Dashboard);
