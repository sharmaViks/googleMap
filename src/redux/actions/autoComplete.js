export const SET_AUTOCOMPLETE_DATA = "SET_AUTOCOMPLETE_DATA";
export const SET_SEARCH_HISTORY = "SET_SEARCH_HISTORY";

export const getAutoCompleteData = (searchData) => {
    return (dispatch) => {
        //Using Google's AutocompleteService get the suggestions for the dropdown
        const autocompleteService = new window.google.maps.places.AutocompleteService()
        const request = {
            input: searchData
        }
        autocompleteService.getPlacePredictions(request, (results, callback) => {
            let data = { [searchData]: results };
            if (results?.length > 0) {
                dispatch({
                    type: SET_AUTOCOMPLETE_DATA,
                    data: data
                });
            }
        })
    };
};

//Store the user search history data
export const setSearchHistory = (searchData) => {
    return (dispatch) => {
        dispatch({
            type: SET_SEARCH_HISTORY,
            data: searchData
        });
    };
};