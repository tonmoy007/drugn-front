import { colors } from "../../utils/settings";
import { IconButton, Text, useTheme } from "react-native-paper";
import { FBox } from "../../components/globals/fbox";
import { useEffect, useState } from "react";
import { StyleSheet } from 'react-native'
import { RecordHeader } from "../../components/medicine/header";
import { DoseList } from "../../components/medicine/dose-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

export const DeleteMedicine = ({ navigation }) => {
    const [list, setList] = useState([...Array(3).keys()].map((item, index) => {
        return {
            title: <Text>{index + 1} ダイアモックス錠250mg</Text>,
            description: <FBox><Text>三和化学研究テキストテキスト</Text><Text style={{ marginTop: 10 }}>朝食前/2錠</Text></FBox>,
            id: item,
            selected: false,
        }
    }))

    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.navBack} onPress={handleBackNav}
                ><MaterialIcons name='keyboard-arrow-left' size={28} color={colors.white} /> <Text>戻る</Text></TouchableOpacity>
            ),
            headerRight: () => {
                return (
                    <Text style={{
                        ...styles.text, color: theme.colors.primary
                    }} onPress={handleNextNav}>次へ</Text >
                )
            }
        });
    }, []);

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.push('manageMedicine')
    }

    const handleNextNav = () => {
    }

    const deleteMedicine = (itemID) => {
        setList(list.filter(item => item.id !== itemID))
    }

    const rightSwipeAction = (itemID) => {
        return (<>
            <FBox style={{ alignItems: 'center', justifyContent: 'center', marginRight: 20 }}>
                <TouchableOpacity onPress={() => deleteMedicine(itemID)}>
                    <IconButton icon={"trash-can"} iconColor={colors.red}
                        style={{ width: 'inherit', height: 'inherit', margin: 0 }} />
                    <Text style={{ color: colors.red }}>消去</Text>
                </TouchableOpacity>
            </FBox>
        </>)
    }

    return (
        <FBox style={styles.container}>
            <RecordHeader />
            <FBox>
                <DoseList list={list} swipeable={true} rightSwipeAction={rightSwipeAction} />
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