import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { COLORS } from "@/Utils/colors";

const GlobalLoader = () => {
    const isFetching = useIsFetching(); // GET APIs
    const isMutating = useIsMutating(); // POST/PUT/DELETE APIs

    const loading = isFetching > 0 || isMutating > 0;

    if (!loading) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={COLORS.primary[500]} />
        </View>
    );
};

export default GlobalLoader;

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        zIndex: 999,
    },
});