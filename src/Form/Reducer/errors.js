const initialState = {
    key: "*",
    name: "*",
    phoneNumber: "*",
    email: "*"
}

export const errors = (state = initialState, action) => {
    switch (action.type) {
        case "HANDLE_ERROR": {
            let errors = { ...state };
            errors[action.payload.id] = action.payload.message;
            state = errors
        }; break;
        case "HANDLE_RESET": {
            let errors = { ...initialState };
            state = errors
        }; break;
        case "HANDLE_EDIT": {
            let errors = { 
                key: "",
                name: "",
                phoneNumber: "",
                email: ""
             };
            state = errors
        }; break; 
        case "HANDLE_UPDATE": {
            let errors = {...initialState};
            state = errors
        }; break;
        case "HANDLE_KEY": {
            let errors = {...state};
            errors[action.payload.id] = action.payload.message
        }
    }
    return state
}
