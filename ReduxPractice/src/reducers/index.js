const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    deletedElement: null,
    activeFilter: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        default: return state
        case 'CLICKED_DELETE_BTN':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
                deletedElement: action.payload

            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload
            }
    
    }
}

export default reducer;