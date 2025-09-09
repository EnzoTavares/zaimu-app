import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GoalItemProps {
    title: string;
    percent: number;
    saved: number;
    target: number;
}

const GoalItem = ({ title, percent, saved, target }: GoalItemProps)=> {
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
                </View>
                <View style={styles.amountRow}>
                    <Text style={styles.saved}>R$ {saved.toLocaleString('pt-BR')}</Text>
                    <Text style={styles.target}>R$ {target.toLocaleString('pt-BR')}</Text>
                </View>
            </View>
            <View style={styles.percentContainer}>
                <Text style={styles.percent}>{percent}%</Text>
            </View>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: '#fff',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#222',
        fontSize: 16,
        marginBottom: 2,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 6,
        overflow: 'hidden',
        marginTop: 4,
        marginBottom: 4,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#111',
        borderRadius: 6,
    },
    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 11,
        marginTop: 2,
    },
    saved: {
        color: '#7CB342',
        fontSize: 12,
        fontWeight: 'bold',
    },
    target: {
        color: '#888',
        fontSize: 12,
    },
    percentContainer: {
        width: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    percent: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#444',
    },
});