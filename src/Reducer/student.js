const initialStudent = {
    key: "",
    name: "",
    phoneNumber: "",
    email: ''
}

export const student = (state = initialStudent, action) => {
    switch (action.type) {
        case "HANDLE_CHANGE": {
            const { id, value } = action.payload
            let newState = { ...state };
            newState[id] = value;
            state = newState
        }; break;
        case "HANDLE_RESET": {
            let newState = { ...initialStudent };
            state = newState
        }; break;
        case "HANDLE_EDIT": {
            let newState = { ...action.payload };
            state = newState
        }; break;
        case "HANDLE_UPDATE": {
            let newState = {...initialStudent};
            state = newState;
        }; break;
    }
    return state
} 