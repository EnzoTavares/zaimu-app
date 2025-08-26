import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import CustomActivityIndicator from "@/src/components/common/ActivityIndicatorCircleSnail";

type LoadingOverlayProps = {
    visible: boolean;
};

const LoadingOverlay = ({ visible }: LoadingOverlayProps) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
        >
            <View style={styles.overlay}>
                <CustomActivityIndicator />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        // flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',

        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default LoadingOverlay;