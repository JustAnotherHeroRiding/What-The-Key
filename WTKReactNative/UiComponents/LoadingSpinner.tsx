import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../assets/colors';

const LoadingSpinner = () => {
    return (
        <View className='flex flex-1 justify-center items-center bg-cream p-3 rounded-full mt-[3%]'>
            <ActivityIndicator size="large" color={`${colors.amber600}`} />
        </View>
    );
};


export default LoadingSpinner;
