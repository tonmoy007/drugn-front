import { FBox } from "../../components/globals/fbox";
import { Button, Divider, Text, TextInput, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FPaperSelect } from "../../components/globals/select";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors, RootParamList } from "../../utils/settings";
import SideSwipe from 'react-native-sideswipe'
import { CustomIcon } from "../../utils/custom-icon";
import { ScrollView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";

const data = [{ value: "朝：食前 1", label: "朝：食前 1" }, {
    label: "朝：食前 2",
    value: "朝：食前2"
}, { label: "朝：食前 3", value: "朝：食前3" }]

const dosages = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
const initDose = { value: '', label: '' }
const initTime = { value: "", label: "" }
export const EditMedicine = ({ route, navigation }) => {
    const { handleSubmit, control, setValue } = useForm()
    const [medIcon, setMedIcon] = useState(0)
    const [doseTime, setDoseTime] = useState([{ dosage: initDose, time: initTime, id: 0 }])

    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const theme = useTheme();
    const medIconsColors = [colors.white, colors.primary2, theme.colors.error, theme.colors.primary, colors.textSemiDark, colors.red]

    const MedicineIcons = ({ index }) => {
        return (
            <Button style={{ ...styles.iconContainer, borderWidth: medIcon === index ? 1 : 0, borderColor: theme.colors.onPrimary }}
                onPress={() => setMedIcon(index)}>
                <CustomIcon name="pill" color={medIconsColors[index]} size={30} style={{ lineHeight: 30 }} />
            </Button>
        )
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.navBack} onPress={handleBackNav}><MaterialIcons name='keyboard-arrow-left' size={28} color={colors.white} /> <Text>戻る</Text></TouchableOpacity>
            ),
            headerRight: () => {
                return (
                    <Text style={{ ...styles.navText, color: theme.colors.primary }}> 次へ</Text >
                )
            }
        });
    }, []);

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('addMedicine')
    }

    const handleDoseChange = (item, index, type) => {
        let tempArr = [...doseTime];
        tempArr[index] = { ...tempArr[index], [type]: item };
        setDoseTime(tempArr)
    }
    const removeDosage = (dose) => {
        setDoseTime(doseTime.filter(item => item.id !== dose.id))
    }

    return (
        <ScrollView>
            <FBox style={{
                flex: 1,
                paddingHorizontal: 18,
                paddingTop: 18,
                overflow: "hidden",
                position: "relative",
            }}>

                <FBox>
                    <Controller render={({ field, fieldState, formState }) => {
                        return (
                            <>
                                <Text style={styles.label}>薬の名前</Text>
                                <TextInput mode={"outlined"}
                                    outlineStyle={{ borderWidth: 0, backgroundColor: "rgba(255,255,255,.07)" }}
                                    onChangeText={field.onChange} onBlur={field.onBlur} value={field.value}
                                    ref={field.ref} error={Boolean(fieldState.error)} placeholder={"薬の名前"} />
                            </>
                        )
                    }} name={"query"} control={control} />
                </FBox>
                <Text style={{ ...styles.label, marginBottom: 5 }}>薬のアイコンを設定する</Text>
                <SideSwipe data={medIconsColors}
                    itemWidth={100}
                    style={{ width: '100%' }}
                    renderItem={({ itemIndex }) => (
                        <MedicineIcons index={itemIndex} />
                    )} />

                {doseTime.map((dose, index) =>
                    <FBox key={dose.id}>
                        <Divider style={{ marginTop: 25 }} />
                        <FBox>
                            <Text style={styles.label}>服用時間 {index + 1}</Text>
                            <FPaperSelect name={"dist"} title={"選択してください"}
                                selectItems={data}
                                mode={"outlined"}
                                onChange={(item) => handleDoseChange(item, index, 'time')}
                                outlineStyle={{ backgroundColor: "rgba(255,255,255,.06)" }}
                                outlineColor={"transparent"}
                                selectedItem={dose.time}
                            />
                        </FBox>

                        <FBox>
                            <Text style={styles.label}>服用数 {index + 1}</Text>
                            <FBox style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <FBox style={{ flex: 3 }}>
                                    <FPaperSelect name={"dosage"} title={"選択してください"}
                                        selectItems={dosages}
                                        mode={"outlined"}
                                        onChange={(item) => handleDoseChange(item, index, 'dosage')}
                                        outlineStyle={{ backgroundColor: "rgba(255,255,255,.06)" }}
                                        outlineColor={"transparent"}
                                        selectedItem={dose.dosage}
                                    />
                                </FBox>
                                <FBox style={{ paddingLeft: 20 }}>
                                    <Text style={{ color: colors.text }}>錠 / 袋</Text>
                                </FBox>
                            </FBox>
                        </FBox>
                        {index > 0 && <FBox style={{ width: 'max-content', marginTop: 10 }}>
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 'max-content' }}
                                onPress={() => removeDosage(dose)}>
                                <MaterialIcons name='delete' onPress={() => { }}
                                    style={{ color: theme.colors.errorContainer }} size={22} />
                                <Text style={{ color: theme.colors.errorContainer }}>投薬時間を削除</Text>
                            </TouchableOpacity>
                        </FBox>}
                    </FBox>
                )}

                <Text style={{ ...styles.addDoseText, color: theme.colors.primary }} onPress={() =>
                    setDoseTime(doseTime => [...doseTime, { dosage: initDose, time: initTime, id: doseTime[doseTime.length - 1].id + 1 }])}>服用時間を追加する</Text>
            </FBox >
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: 'rgba(255,255,255,.06)',
        padding: 15,
        paddingHorizontal: 10,
        marginRight: 10,
        borderRadius: 5
    },
    label: {
        color: colors.textSemiDark,
        fontSize: 18,
        marginTop: 15
    },
    navBack: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navText: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    addDoseText: {
        textAlign: 'center',
        marginTop: 80,
        marginBottom: 50
    }
});