import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "../screens/public/SignIn";
import FirstLogin from "../screens/public/FirstLogin";

const PublicRoutes = () => {

	const Stack = createNativeStackNavigator();

	return(
		<Stack.Navigator initialRouteName='SignIn' screenOptions={{
			headerShown: false,
			contentStyle: { backgroundColor: "#FFF" }
		}}>
			<Stack.Screen name='SignIn' component={SignIn} />
			<Stack.Screen name='FirstLogin' component={FirstLogin} />
		</Stack.Navigator>
	);
};

export { PublicRoutes };
