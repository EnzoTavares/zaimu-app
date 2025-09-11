import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import AppIcon from "@/src/components/branding/AppIcon";
import { Appbar } from 'react-native-paper';
import colors from "@/src/themes/colors";
import {spacing} from "@/src/themes/dimensions";
import CircledProfileButton from "@/src/components/buttons/CircledProfileButton";
import ModalSide from "@/src/components/modals/ModalSide";

type AppBarProps = {
    title: string;
    navigation?: any;
}

const CustomAppBar = (props: AppBarProps) => {
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    function handleCloseProfileModal() {
        setProfileModalVisible(false);
    }

    return (
        <Appbar.Header style={styles.header}>
            <View style={styles.appBarContainer}>
                <AppIcon
                    height={spacing.xl}
                    width={spacing.xl}
                />

                <CircledProfileButton
                    onPress={() => {setProfileModalVisible(true)}} // abrir barre lateral de perfil
                    textContent="ET"
                />

                <ModalSide
                    visible={profileModalVisible}
                    onRequestClose={handleCloseProfileModal}
                    header={
                        <CircledProfileButton
                            textContent="ET"
                        />
                    }
                >
                    <View style={{
                        height: 100,
                        width: '100%',
                        backgroundColor: 'red'
                    }}>


                    </View>

                </ModalSide>
            </View>
        </Appbar.Header>
    );
}

export default CustomAppBar;

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.backgroundDefault,
        elevation: 2
    },
    appBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
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