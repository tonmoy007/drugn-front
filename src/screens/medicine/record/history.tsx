import { FBox } from "../../../components/globals/fbox";
import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { IconButton, Text, useTheme } from "react-native-paper";
import { DoseList } from "../../../components/medicine/dose-list";
import { ManageUserMeds } from "../../../components/medicine/manage";

export const RecordMed = ({ navigation }) => {
    const [selected, setSelected] = useState<number>(0)
    const theme = useTheme()

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={theme.colors.onPrimary} onPress={handleBackNav} />
            ),
            headerRight: () => {
                return (
                    <Text style={{
                        ...styles.text, color: selected ? theme.colors.primary : theme.colors.onSurfaceDisabled
                    }} onPress={handleNextNav}>次へ</Text >
                )
            }
        });
    }, [selected]);


    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('recordMedicine')
    }

    const handleNextNav = () => {
        if (selected)
            navigation.push('deleteMedicine')
    }
    // onLocationSelect={onLocationSelect}
    return (
        <>
            {/* <ManageUserMeds delMed={false} /> */}
        </>

    )
}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
})