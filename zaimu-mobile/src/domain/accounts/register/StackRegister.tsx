import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenConfirmEmail from "@/src/domain/accounts/confirm_email/ScreenConfirmEmail";
import ScreenRegister from "@/src/domain/accounts/register/ScreenRegister";
import {User} from "@/src/types/User";

export type ParamList = {
    Register: undefined;
    ConfirmEmail: { user: User };
    StackLogin: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

export default function StackRegister() {
    return (
        <Stack.Navigator
            initialRouteName='Register'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='Register' component={ScreenRegister} />
            <Stack.Screen name='ConfirmEmail' component={ScreenConfirmEmail} />
        </Stack.Navigator>
    );
}

// options={ { headerShown: false }}

