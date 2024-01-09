import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";
import tw from "../../utils/tailwindRN";

interface CustomButtonProps {
    onPress?: (event: GestureResponderEvent) => void,
    title?: string,
    loading?: boolean,
    disabled?: boolean,
    btnStyle?: StyleProp<ViewStyle> // Add this line for custom styles
    txtStyle? : StyleProp<TextStyle> // Add this line for custom styles


}

// Custom Button Component
export const CustomButton = ({ onPress, title, loading, disabled, btnStyle, txtStyle }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, btnStyle]}
            onPress={onPress}
            disabled={loading || disabled}
        >
            <Text style={[styles.buttonText,txtStyle]}>{loading ? 'Loading ...' : title}</Text>
        </TouchableOpacity>
    );
};

// Styles
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'blue', // Default color, can be overridden
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});