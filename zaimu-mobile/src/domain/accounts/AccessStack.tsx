import StackLogin from '@/src/domain/accounts/login/StackLogin';
import StackRegister from '@/src/domain/accounts/register/StackRegister';
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export type AuthStackParamList = {
    StackLogin: undefined;
    StackRegister: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StackLogin" component={StackLogin} />
            <Stack.Screen name="StackRegister" component={StackRegister} />
        </Stack.Navigator>
    );
}

export default AuthStack