import React, { useEffect } from 'react';
import { PublicRoutes } from './public.routes';
import { PrivateRoutes } from './private.routes';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from '../shared/services/authState';
import { NavigationContainer } from '@react-navigation/native';
import { autoLoginFail, autoLoginSuccess, autoLoginVerify } from '../redux/login/login-action';

const Routes = () => {

    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

    const dispatch = useDispatch();
    const { checkAuthState } = authState();
   
    useEffect(() => {
        const verifyUserAuth = async () => {
            dispatch(autoLoginVerify());
            await checkAuthState().then((user) => {
                dispatch(autoLoginSuccess(user));
            }).catch(() => {
                dispatch(autoLoginFail());
            });
        }

        verifyUserAuth();
    });

    return( 
        <NavigationContainer>
            {!isAuthenticated && <PublicRoutes/>}
            {isAuthenticated && <PrivateRoutes/>}
        </NavigationContainer>
    );
}

export default Routes;