import {StyleSheet, View} from 'react-native';
import colors from "@/themes/colors";
import React from "react";

type DotsPaginationProps = {
    array: any[];
    currentIndex: number;
    activeColor?: string;
    inactiveColor?: string;
    color?: string;
};

function DotsPagination (props: DotsPaginationProps) {
    return (
        <View style={styles.pagination}>
            {props.array.map((_, index) => (
                    <View
                        key={index}
                style={[
                        [styles.dot, props.inactiveColor ? {backgroundColor: props.inactiveColor} : null],
                    props.currentIndex === index &&
                        [styles.dotActive, props.activeColor ? {backgroundColor: props.activeColor} : null],
]}
    />
))}
    </View>
);

}

export default DotsPagination;

const styles = StyleSheet.create({
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 60,
    },
    dot: {
        height: 9,
        width: 9,
        borderRadius: 4,
        backgroundColor: colors.greyLight,
        marginHorizontal: 4,
    },
    dotActive: {
        backgroundColor: colors.primary,
        width: 15
    },
});