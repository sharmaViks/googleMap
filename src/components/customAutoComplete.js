import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getAutoCompleteData, setSearchHistory } from '../redux/actions/autoComplete';;

export default function CustomAutoComplete({ handleSelectedPlace }) {
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState();
    const [options, setOptions] = useState([]);
    const dispatch = useDispatch();
    const autoCompleteOptions = useSelector(state => state.autoComplete.data) // This state contains the data corresponding to the search characters and its results from Autocomplete API
    const searchHistory = useSelector(state => state.autoComplete.searchHistory) // This state contains the user search history results for dropdown suggestions

    // Whenever user types something in Autocomplete input box this function is called
    const handleInputChange = (inputData) => {
        setInputValue(inputData);
        // If user search character is not in Redux then dispatch action to make API call
        if (inputData && !autoCompleteOptions?.[inputData]) {
            dispatch(getAutoCompleteData(inputData)); 
        }
        // Else if  user search character is in Redux then get data from Redux
        else {
            // If user search character is null or empty then set default map location and search options from Redux
            if (!inputData) {
                handleSelectedPlace('India');
                if (searchHistory) {
                    setOptions(searchHistory);
                }
                else {
                    setOptions([]);
                }
            }
            else {
                // Set user dropdown options from Redux which corresponds to user search character
                let _autoCompleteOptions = JSON.parse(JSON.stringify(autoCompleteOptions));
                if (_autoCompleteOptions?.data) {
                    let searchOptions = _autoCompleteOptions?.data?.[inputData];
                    if (searchOptions?.length > 0) {
                        setOptions(searchOptions);
                    }
                }
            }
        }
    }

    useEffect(() => {
        let searchOptions = JSON.parse(JSON.stringify(autoCompleteOptions));
        if (searchOptions) {
            searchOptions = searchOptions?.[inputValue] || options;
            setOptions(searchOptions); //Set dropdown options corresponding to user search or default options from search history
        }
    }, [autoCompleteOptions])

    useEffect(() => {
        if (searchHistory) {
            setOptions(searchHistory); //Set user search history options from Redux
        }
    }, [searchHistory])

    // When user select any option from dropdown then this function is called
    const handlePlaceSelected = (newValue) => {
        if (newValue) {
            dispatch(setSearchHistory(newValue)) // store the selected value in Redux 
            handleSelectedPlace(newValue.description || 'India'); //set selected place to user selected option from dropdown to display marker in map.
            setValue(newValue);
        }
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                handlePlaceSelected(newValue); // When user types something in Autocomplete input box this function is called
            }}
            onInputChange={(event, newInputValue) => {
                handleInputChange(newInputValue); // When user select any option from dropdown then this function is called
            }}
            id="controllable-states-demo"
            openOnFocus
            options={options}
            getOptionLabel={option => option?.description || ""}
            renderInput={(params) => <TextField {...params} label="Enter address" />}
        />
    );
}
