import {createContext, useReducer} from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
    user: {
        _id: '60c34338613a80037d2e9582',
        profilePicture: "",
        coverPicture:"",
        followers: Array,
        following: Array,
        isAdmin: false,
        username:"amir",
        email: "amir@gmail.com",
        password: "$2b$10$aaRc3KrxPnfHSSiTDlOw6eOVQr10KxZ7PGsSTZy2iBnjm3HkG8OcW",
        desc: "hey it's my updated desc"
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] =  useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user: state.user, 
            isFetching:state.isFetching, 
            error: state.error,
            dispatch
            }}>{children}
        </AuthContext.Provider>
        )
    
}