import { colors } from "../../utils/settings";
import { Text, useTheme } from "react-native-paper";
import { FBox } from "../../components/globals/fbox";
import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { RecordHeader } from "../../components/medicine/header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { ManageUserMeds } from "../../components/medicine/manage";

export const DeleteMedicine = ({ navigation }) => {

    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.navBack} onPress={handleBackNav}
                ><MaterialIcons name='keyboard-arrow-left' size={28} color={colors.white} />
                    <Text>戻る</Text></TouchableOpacity>
            ),
            headerRight: () => {
                return (
                    <Text style={{
                        ...styles.text, color: theme.colors.primary
                    }} onPress={handleNextNav}>次へ</Text>
                )
            }
        });
    }, []);

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.push('dashboard')
    }

    const handleNextNav = () => {
        navigation.navigate("dashboard")
    }

    return (
        <FBox style={styles.container}>
            <RecordHeader />
            <FBox style={{ flex: 1 }}>
                <ManageUserMeds delMed={true} />
            </FBox>

        </FBox>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    }
});