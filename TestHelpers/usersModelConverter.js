const User = require('$models');

class UsersModelConverter {
    static async convertToSingleUserModel(responseData) {
        if (responseData === null) {
            return null; // Return null if responseData is null
        }

        return new User(responseData.id, responseData.username, responseData.password, responseData.role);
    }

    static async convertToUsersModelArray(responseDataArray) {
        if (Array.isArray(responseDataArray)) {
            return responseDataArray.map(userData => {
                return new User(userData.id, userData.username, userData.password, userData.role);
            });
        } else {
            throw new Error('Invalid response data format');
        }
    }
}

module.exports = UsersModelConverter;