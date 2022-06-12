/* eslint-disable no-unused-vars */
import React from "react";
import Map from "../screens/private/Map";
import Gallery from "../screens/private/Gallery";
import TrailManager from "../screens/private/TrailManager";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const PrivateRoutes = () => {

	const Stack = createNativeStackNavigator();

	return(
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Map' component={Map}/>
			<Stack.Screen name='Gallery' component={Gallery}/>
			<Stack.Screen name='TrailManager' component={TrailManager}/>
		</Stack.Navigator>
	);
};

export { PrivateRoutes };
