import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ percent, color }: { percent: number; color?: string }) {
    return (
        <View style={styles.bg}>
            <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color || '#000' }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    bg: { height: 6, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginTop: 4, marginBottom: 2 },
    fill: { height: '100%', borderRadius: 6 },
});