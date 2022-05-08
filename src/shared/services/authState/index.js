import auth from "@react-native-firebase/auth";

const authState = () => {

    const checkAuthState = async () => {        
        return new Promise((resolve, reject) => {
            auth().onAuthStateChanged((user) => {
                if( user ) {
                    resolve(user);
                } else {
                    reject(new Error());
                }
            });
        });
    }

    return{ checkAuthState };
};

export { authState };