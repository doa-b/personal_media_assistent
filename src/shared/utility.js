export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

// function for dynamic sorting
export const compareValues = (key, order = 'ascending') => {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'descending') ? (comparison * -1) : comparison
        );
    };
};

// function to filter array by value
export const filterByValue = (array, key, string) => {
    return array.filter(element => element[key].toLowerCase().includes(string.toLowerCase()));
};

export const getSeriesStatus = (series, currentEpisodeId) => {
    if (series) {
        if (series.status !== 'Returning Series') {
            if (currentEpisodeId === series.last_episode_to_air.id) {
                return 'finished'
            } else return 'available'
        }
        if (series.next_episode_to_air) {
            if (currentEpisodeId === series.next_episode_to_air.id) {
                console.log('next_episode_to_air');
                return 'paused';
            }
        } else if (currentEpisodeId === series.last_episode_to_air.id) {
            console.log('last_episode_to_air');
            return 'paused';
        }
    }
    return 'available'
};


export const convertStringToDate = (string) => {
    var parts = string.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);
};


