import {
    SET_AUTOCOMPLETE_DATA,
    SET_SEARCH_HISTORY
} from "../actions/autoComplete";

const initState = {
    data: null,
    searchHistory: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_AUTOCOMPLETE_DATA: {
            return {
                ...state,
                data: { ...state.data, ...action.data }
            };
        }
        case SET_SEARCH_HISTORY: {
            //Check if the selected place is already not there in search history
            let exist = false;
            for (let i = 0; i < state.searchHistory.length; i++) {
                if (state.searchHistory[i]?.place_id === action.data?.place_id) {
                    exist = true;
                }
            }
            // If place is already not there then push into search history array
            if (!exist) {
                let searchHistory = [...state.searchHistory];
                searchHistory.push(action.data);
                return {
                    ...state,
                    searchHistory: [...searchHistory]
                };
            }
            return {
                ...state,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
