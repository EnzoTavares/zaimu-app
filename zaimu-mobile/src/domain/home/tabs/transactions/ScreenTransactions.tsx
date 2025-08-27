import React from 'react';
import {StyleSheet, View} from "react-native";
import Card from "@/src/components/cards/Card";
import {spacing} from "@/src/themes/dimensions";

const ScreenTransactions = () => {


    return (
        <View style={styles.container}>
            <Card shadowed={false} style={{backgroundColor: 'black'}}>

                <View style={{height: 50, backgroundColor: 'white'}}></View>


                <View style={{height: 50}}></View>

            </Card>
        </View>
    );
};

export default ScreenTransactions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: '10%',
    }
})