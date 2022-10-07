import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";

import { PublicRoutes } from "./public.routes";
import { PrivateRoutes } from "./private.routes";

import firebase from "../shared/services/firebase";
import { authActions, loaderActions } from "../store/actions";

const Routes = () => {

	const isAuthenticated = useSelector((state) => !!state.auth.registration);

	const dispatch = useDispatch();
	const netInfo = useNetInfo();

	const { checkAuthState, getUserData } = firebase();
	const { authentication } = authActions;
	const { enableLoading, disableLoading } = loaderActions;

	/**
     * Verificar a validade do token do usuário
     */
	useEffect(() => {
		const verifyUserAuth = async () => {
			await checkAuthState()
				.then((user) => {
					const registration = user.email.split("@")[0];
					getUserData(registration).then((data) => {
						const uid = Object.keys(data)[0];
						const userData = {
							uid,
							...data[uid]
						};

						dispatch(disableLoading());
						dispatch(authentication(userData));
					});
				}).catch(() => {
					dispatch(disableLoading());
				});
		};

		const offlineAuth = async () => {
			const userData = await AsyncStorage.getItem("user");
			dispatch(disableLoading());
			if( userData && Object.keys(userData).length > 0 ) {
				dispatch(authentication(JSON.parse(userData)));
			}
		};

		dispatch(enableLoading("Verificando dados..."));
		if( netInfo.isConnected ) {
			verifyUserAuth();
		} else {
			offlineAuth();
		}
	}, []);

	return(
		<NavigationContainer>
			{!isAuthenticated && <PublicRoutes/>}
			{isAuthenticated && (
				<>
					<PrivateRoutes/>
					<Toast/>
				</>
			)}
		</NavigationContainer>
	);
};

export default Routes;
