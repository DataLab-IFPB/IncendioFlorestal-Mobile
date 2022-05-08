import React from 'react';
import Map from '../pages/private/Map';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const PrivateRoutes = () => {

    const Stack = createNativeStackNavigator();

    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Map' component={Map}/>
        </Stack.Navigator>
    );
}

export { PrivateRoutes };