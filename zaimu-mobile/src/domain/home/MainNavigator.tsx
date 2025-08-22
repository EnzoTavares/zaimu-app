// import React from 'react'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// import CustomTabBar from '@/components/navigation/CustomTabBar'
// import SearchScreen from '@/domain/home/tabs/search/SearchScreen'
// import ProfileScreen from '@/domain/home/tabs/profile/ProfileScreen'
// import FollowingScreen from '@/domain/home/tabs/following/FollowingScreen'
// import HomeScreen from '@/domain/home/tabs/home/HomeScreen'
//
//
// const Tab = createBottomTabNavigator()
//
// export default function MainNavigator() {
//     return (
//         <Tab.Navigator
//             screenOptions={{headerShown: false}}
//             tabBar={(props) => <CustomTabBar {...props} />}
//         >
//             <Tab.Screen name="Home" component={HomeScreen}/>
//             <Tab.Screen name="Search" component={SearchScreen}/>
//             <Tab.Screen name="Following" component={FollowingScreen}/>
//             <Tab.Screen name="Profile" component={ProfileScreen}/>
//         </Tab.Navigator>
//     )
// }