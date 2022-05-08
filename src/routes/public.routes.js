import React from 'react';
import SignIn from '../pages/public/SignIn';
import FirstLogin from '../pages/public/FirstLogin';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const PublicRoutes = () => {

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFF' }
        }}>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='FirstLogin' component={FirstLogin}/>
        </Stack.Navigator>
    );
}

export { PublicRoutes };