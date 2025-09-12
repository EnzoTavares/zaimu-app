import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import colors from "@/src/themes/colors";
import {spacing} from "@/src/themes/dimensions";
import {Image} from "expo-image";
import icons from "@/src/constants/icons";
import {IconName} from "@/src/types/Icon";

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return(
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                let iconNameOutlined: IconName;

                switch (route.name) {
                    case 'Home':
                        iconNameOutlined = 'greyHouseOutlined';
                        break;
                    case 'Transactions':
                        iconNameOutlined = 'greyWalletOutlined';
                        break;
                    default:
                        iconNameOutlined = 'greyWalletOutlined';
                }

                let iconNameFill: IconName;

                switch (route.name) {
                    case 'Home':
                        iconNameFill = 'greyHouseFill';
                        break;
                    case 'Transactions':
                        iconNameFill = 'greyWalletFill';
                        break;
                    default:
                        iconNameFill = 'greyWalletFill';
                }

                return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={onPress}
                            style={{ alignItems: 'center', justifyContent: 'center', flex: 1, height: '100%' }}
                        >
                            {!isFocused && (
                                <Image
                                    source={icons[iconNameOutlined]}
                                    style={styles.icons}
                                />
                            )}

                            {isFocused && (
                                <Image
                                    source={icons[iconNameFill]}
                                    style={styles.icons}
                                    tintColor={colors.black}
                                />
                            )}
                        </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 80,
        alignItems: "center",
        justifyContent: "space-around",
        borderTopWidth: 0.4,
        paddingBottom: spacing.lg
    },
    icons: {
        width: spacing.lg,
        height: spacing.lg,
    }
})