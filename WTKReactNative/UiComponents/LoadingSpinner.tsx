import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={`${colors.amber600}`} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.cream,
        padding: 10,
        borderRadius: 40,
        marginTop: "3%"
    },
});

export default LoadingSpinner;
