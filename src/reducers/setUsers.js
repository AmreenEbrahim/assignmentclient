const setUsers = ( state = [], action) => {
    switch (action.type) {
        case "SET-USERS":
            return action.payload;
        default:
            return state;
    }
};

export default setUsers;