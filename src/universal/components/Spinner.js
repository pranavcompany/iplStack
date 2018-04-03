import React from "react";
import {View, ActivityIndicator, StyleSheet} from "react-native";

const Spinner = Comp => ({
    isLoading,
    children,
    ...props
}) => {
    return (
    <View style={{flex: 1}}>
        <Comp {...props}>{children}</Comp>
        {isLoading && <View style={styles.fullScreen}><ActivityIndicator size='large'/></View>}
    </View>);
};

const styles = {
    fullScreen: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        justifyContent: "center",
        ...StyleSheet.absoluteFillObject
    }
};

export default Spinner;
