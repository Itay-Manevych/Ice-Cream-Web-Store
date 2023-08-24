const getUser = async () => {
    try {
        const response = await $.ajax({
            url: '/dashboard/user', 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving a user", error);
    }
}

const getAllUsers = async () => {
    try {
        const response = await $.ajax({
            url: '/users', 
            type: 'GET',
        });
        return response;
    }
    catch(error) {
        console.log("AJAX error occured when retrieving all users", error);
    }
}

const checkExistingUser = async (user_email) => {
    const users = await getAllUsers();
    const user = await getUser();
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === user_email && user.email != user_email) {
            return true;
        }
    }
    return false;
}

export const UserFunctions = {getUser, getAllUsers, checkExistingUser}; 