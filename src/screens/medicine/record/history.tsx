import { FBox } from "../../../components/globals/fbox";
import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { IconButton, Text, useTheme } from "react-native-paper";
import { DoseList } from "../../../components/medicine/dose-list";

export const RecordMed = ({ navigation }) => {
    const [selected, setSelected] = useState<number>(0)
    const [list, setList] = useState([...Array(10).keys()].map((item) => {
        return {
            title: `${item + 1} ダイアモックス錠250mg`,
            description: <FBox><Text>三和科学研究</Text><Text style={{ marginTop: 10 }}>朝食前/2錠</Text></FBox>,
            id: item,
            selected: false
        }
    }))
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

    const onLocationSelect = (index) => {
        const l = list.map(data => {
            return { ...data, selected: false }
        })
        l[index].selected = true
        setSelected(index + 1)
        setList(l)
    }

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

    return (
        <DoseList list={list} onLocationSelect={onLocationSelect} />
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