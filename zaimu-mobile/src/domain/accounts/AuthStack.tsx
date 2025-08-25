import React from "react";
import StackLogin from '@/src/domain/accounts/login/StackLogin';
import StackRegister from '@/src/domain/accounts/register/StackRegister';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export const AuthContext = React.createContext({
    signIn: () => {},
});

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StackLogin" component={StackLogin} />
            <Stack.Screen name="StackRegister" component={StackRegister} />
        </Stack.Navigator>
    );
}

export default AuthStack