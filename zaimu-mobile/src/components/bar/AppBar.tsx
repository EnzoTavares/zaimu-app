import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import AppIcon from "@/src/components/branding/AppIcon";
import { Appbar } from 'react-native-paper';
import colors from "@/src/themes/colors";
import {spacing} from "@/src/themes/dimensions";

type AppBarProps = {
    title: string;
    navigation?: any;
}

const CustomAppBar = (props: AppBarProps) => {

    return (
        <Appbar.Header style={styles.header}>
            <View style={styles.appBarContainer}>
                <AppIcon
                    height={spacing.xl}
                    width={spacing.xl}
                />

                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => console.log('Buscar')}
                >
                    <Text style={styles.icon}>🔍</Text>
                </TouchableOpacity>
            </View>
        </Appbar.Header>
    );
}

export default CustomAppBar;

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.backgroundDefault,
    },
    appBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
    },
    iconButton: {
        padding: 8,
        marginHorizontal: 4,
        position: 'relative',
    },
    icon: {
        fontSize: 20,
    },
})