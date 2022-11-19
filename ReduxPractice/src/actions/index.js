export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}


export const clickedDeleteBtn = (cickedElementId) => {
    return {
        type: 'CLICKED_DELETE_BTN',
        payload: cickedElementId
    }
}

export const activeFilterChanged = (newActiveFilter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: newActiveFilter
    }
}
