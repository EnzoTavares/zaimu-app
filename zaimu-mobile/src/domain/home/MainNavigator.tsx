import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import ScreenTransactions from "./tabs/transactions/ScreenTransactions";
import colors from "@/src/themes/colors";
import CustomAppBar from "@/src/components/bar/AppBar";
import ScreenHome from "./tabs/home/ScreenHome";

const Tab = createBottomTabNavigator()

export default function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                header: ({ options, route }) => (
                    <CustomAppBar title={route.name} navigation={navigation}/>
                ),
                headerStyle: {
                    backgroundColor: colors.backgroundDefault,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            })}
            // tabBar={() => <TabBar/> }
        >
            <Tab.Screen name="Home" component={ScreenHome}/>
            <Tab.Screen name="Transactions" component={ScreenTransactions}/>
        </Tab.Navigator>
    )
}



// (props) => <CustomTabBar {...props}