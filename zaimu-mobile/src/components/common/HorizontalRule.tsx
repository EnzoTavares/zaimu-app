import React from 'react';
import { View, StyleSheet } from 'react-native';

type HorizontalRuleProps = {
    color?: string;
    height?: number;
};

const HorizontalRule = (props: HorizontalRuleProps) => {
    return (
        <View style={[ styles.hr, { backgroundColor: props.color, height: props.height}]} />
    );
};

const styles = StyleSheet.create({
    hr: {
        width: '75%',
    },
});

export default HorizontalRule;