const loadState = (stateName) => {
    try {
        const serializedState = localStorage.getItem(stateName);

        if (serializedState) {
            return JSON.parse(serializedState);
        }
    } catch (error) {
        return undefined;        
    }
}

/**
 * @param {string} stateName
 */
const saveState = (stateName, state) => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem(stateName, serializedState);
    } catch (err) {
        // TODO: Log errors
        if (process.env.NODE_ENV === 'development') {
            console.error(`Save state error: ${err}`);
        }
    }
}


const browserLocaleStorage = {
    loadState,
    saveState,
};

export default browserLocaleStorage;