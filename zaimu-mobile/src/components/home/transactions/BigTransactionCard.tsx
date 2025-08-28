import React from "react";
import {StyleSheet, Text, View} from "react-native";
import Card from "@/src/components/cards/Card";

type BigTransactionCardProps = {
    title: string;
    amount: number;
    category: string;
}

const BigTransactionCard = (props: BigTransactionCardProps) => {
    return (
        <Card shadowed={true}>
            <View>
                <Text>
                    {props.title}
                </Text>
                <View>

                </View>
            </View>
            <Text>

            </Text>
            <View>
                <View>

                </View>

                <View>

                </View>
            </View>
        </Card>
    );
}

export default BigTransactionCard;

const styles = StyleSheet.create({

})