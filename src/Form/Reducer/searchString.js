const initialState = ""

export const searchString = (state = initialState, action) => {
    switch (action.type) {
        case "search": {
            state = action.payload
        }
    }
    return state
}

