import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenLogin from "@/src/domain/accounts/login/ScreenLogin";
import ScreenForgotPasswordFirst from "@/src/domain/accounts/reset_password/ScreenForgotPasswordFirst";
import { ScreenForgotPasswordSecond } from '@/src/domain/accounts/reset_password/ScreenForgotPasswordSecond';

export type ParamList = {
    Login: undefined;
    ForgotPasswordFirst: undefined;
    ForgotPasswordSecond: { credential: string };
    Register: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

export default function StackLogin() {
  return (
    <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
    >
<Stack.Screen name='Login' component={ScreenLogin} />
        <Stack.Screen name='ForgotPasswordFirst' component={ScreenForgotPasswordFirst} />
        <Stack.Screen name='ForgotPasswordSecond' component={ScreenForgotPasswordSecond} />
    </Stack.Navigator>
  );
}

// options={ { headerShown: false }}

