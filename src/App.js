import React from 'react';
import env from './utils/env';

const App = () => {
    
    return (
        <>
            <p>
                App Component
            </p>
            <p>{env.REACT_APP_GA_TRACKING_ID}</p>
        </>
    );
}

export default App;
