import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type OrHorizontalRuleProps = {
    color?: string;
    height?: number;
};

const OrHorizontalRule = (props: OrHorizontalRuleProps) => {
    return (
        <View style={[ styles.hr, { backgroundColor: props.color, height: props.height}]}>
            <Text style={styles.orText}>
                ou
            </Text>
        </View>

    );
};

const styles = StyleSheet.create({
    hr: {
        width: '100%',
        position: 'relative',
        marginVertical: 35,
    },
    orText: {
        textAlign: "center",
        position: "absolute",
        top: 20,
        // right: "auto",
        left: 50,
    }
});

export default OrHorizontalRule;