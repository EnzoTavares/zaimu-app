import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import colors from "@/src/themes/colors";

type OrHorizontalRuleProps = {
    color?: string;
    height?: number;
};

const OrHorizontalRule = (props: OrHorizontalRuleProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>ou</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.black,
    },
    text: {
        marginHorizontal: 10,
        color: '#333333',
        fontWeight: '600',
        fontSize: 14,
    },
});

export default OrHorizontalRule;