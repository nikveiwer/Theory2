const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    deletedElement: null,
    addedElement: "noChanges"
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
                addedElement: "noChanges"
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
        case 'CLICKED_ADD_BTN':
            return {
                ...state,
                addedElement: "changed"

            }
    
    }
}

export default reducer;