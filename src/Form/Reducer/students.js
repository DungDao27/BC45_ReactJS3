const initialStudent = []

export const students = (state = initialStudent, action) => {
    switch (action.type) {
        case "HANDLE_SUBMIT": {
            let students = [...state];
            students.push(action.payload);
            state = students
            return state
        }
        case "HANDLE_DELETE": {
            let students = [...state];
            let indexDelete = students.findIndex(student => student.key === action.payload);
            students.splice(indexDelete, 1);
            state = students
            return state
        }
        case "HANDLE_EDIT": {
            let students = [...state];
            let student = students.find(student => student.key === action.payload)
            return state
        }
        case "HANDLE_UPDATE": {
            let students = [...state];
            let findStudent = students.findIndex(student => student.key === action.payload.key);
            if (findStudent > -1) {
                students[findStudent] = action.payload
            }
            state = students
            return state
        }

        default: return state

    }
}