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
import { medIcons, medTime } from "../../utils/constants";
import { useSelector } from "react-redux";
import { GlobalState } from "../../utils/store/global";
import { toastMessage } from "../../utils/toast";

const dosages = [
    { value: '1', label: '1', id: 1 },
    { value: '2', label: '2', id: 2 },
    { value: '3', label: '3', id: 3 },
    { value: '4', label: '4', id: 4 },
    { value: '5', label: '5', id: 5 },
    { value: '6', label: '6', id: 6 },
    { value: '7', label: '7', id: 7 },
    { value: '8', label: '8', id: 8 },
];
const initDose = { value: '', label: '', id: -1 }
const initTime = { value: "", label: "", id: -1 }
const allDosageDays: any[] = Array.from({ length: 180 }).map((_, index) => { return { value: index + 1, label: index + 1, id: index + 1 } })

export const EditMedicine = ({ route, navigation }) => {
    const [medName, setMedName] = useState<string>('NONE')
    const { handleSubmit, control, setValue } = useForm()
    const [medIcon, setMedIcon] = useState<number>(1)
    const [doseTime, setDoseTime] = useState<any>([{ dosage: initDose, time: initTime, id: -1 }])
    const [dosageDays, setDosageDays] = useState<any>({ value: 0, label: 0, id: 0 })

    const user = useSelector((state: GlobalState) => state.user)

    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const theme = useTheme();
    const { allMeds = {} } = route.params ?? {}
    const { editID = '' } = route.params ?? ''
    useEffect(() => {
        if (route.params?.medData) {
            setMedName(route.params.medData['CYOUZAI_HOUSOU_UNIT_NAME'])
        }
        if (editID !== '') {
            setMedName(allMeds[editID][0].medicineName);
            let tempDoseTime: any[] = [];
            for (let i = 0; i < allMeds[editID].length; i++) {
                tempDoseTime.push({
                    dosage: { value: dosages[allMeds[editID][i].dose - 1].value, label: dosages[allMeds[editID][i].dose - 1].label, id: allMeds[editID][i].dose },
                    time: { value: medTime[allMeds[editID][i].takeMedicineTimeType].value, label: medTime[allMeds[editID][i].takeMedicineTimeType].label, id: allMeds[editID][i].takeMedicineTimeType },
                    id: i
                });
            }
            setDoseTime(tempDoseTime);
            setMedIcon(+allMeds[editID][0].takeMedicineIconType)
        }
    }, [editID, allMeds])

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity
                    style={styles.navBack} onPress={handleBackNav}><MaterialIcons name='keyboard-arrow-left' size={28} color={colors.white} /> <Text>戻る</Text></TouchableOpacity>
            ),
            headerRight: () => {
                return (
                    <Text onPress={handleNext} style={{ ...styles.navText, color: theme.colors.primary }}> 次へ</Text >
                    // <Text onPress={() => nav.navigate("addedMed")} style={{ ...styles.navText, color: theme.colors.primary }}> 次へ</Text >
                )
            }
        });
    }, [doseTime, editID, medIcon]);


    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('addMedicine')
    }

    const handleNext = () => {
        if (dosageDays.id === 0) {
            toastMessage({ msg: `Please select dose days` })
            return;
        }
        if (doseTime.length > 0 && doseTime[0].dosage.id !== -1 && doseTime[0].time.id !== -1) {
            let finalDosages: object[] = [];
            for (let i = 0; i <= doseTime.length; i++) {
                if (i === doseTime.length) {
                    nav.navigate("addedMed", { allMeds: { ...allMeds, [editID !== '' ? editID : route.params.medData.id]: finalDosages } })
                    break;
                }
                if (doseTime[i].dosage.id !== -1 && doseTime[i].time.id !== -1) {
                    finalDosages.push({
                        userId: user.id,
                        medicineId: editID !== '' ? editID : route.params.medData.id,
                        takeMedicineIconType: +medIcon,
                        takeMedicineTimeType: +doseTime[i].time.id,
                        dose: +doseTime[i].dosage.id,
                        medicineName: medName,
                        days: dosageDays.id
                    })
                } else {
                    toastMessage({ msg: `Error! - Select ${doseTime[i].dosage.id === -1 ? 'dose' : 'time'} for dose ${i + 1}` })
                    break;
                }
            }
            // nav.navigate("addedMed", { allMeds: { ...allMeds, [editID !== '' ? editID : route.params.medData.id]: finalDosages } })
        } else {
            toastMessage({ msg: `Please select dose time` })
        }
    }

    const handleDoseChange = (item, index, type) => {
        let tempArr = [...doseTime];
        tempArr[index] = { ...tempArr[index], [type]: item };
        setDoseTime(tempArr)
    }
    const removeDosage = (dose) => {
        setDoseTime(doseTime.filter(item => item.id !== dose.id))
    }

    const MedicineIcons = ({ index, id }) => {
        return (
            <Button key={id} style={{ ...styles.iconContainer, borderWidth: medIcon === id ? 1 : 0, borderColor: theme.colors.onPrimary }}
                onPress={() => setMedIcon(id)}>
                <CustomIcon name="pill" color={medIcons[id]} size={30} style={{ lineHeight: 30 }} />
            </Button>
        )
    }
    const renderMedIcons = ({ itemIndex, item }) => {
        return (
            <MedicineIcons index={itemIndex} id={item} />
        )
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
                                    editable={false}
                                    outlineStyle={{ borderWidth: 0, backgroundColor: "rgba(255,255,255,.07)" }}
                                    onChangeText={field.onChange} onBlur={field.onBlur} value={medName}
                                    ref={field.ref} error={Boolean(fieldState.error)} placeholder={"薬の名前"} />
                            </>
                        )
                    }} name={"query"} control={control} />
                </FBox>
                {medName !== 'NONE' && <>
                    <Text style={{ ...styles.label, marginBottom: 5 }}>薬のアイコンを設定する</Text>
                    <SideSwipe data={Object.keys(medIcons)}
                        itemWidth={100}
                        style={{ width: '100%' }}
                        renderItem={renderMedIcons} />
                    <FBox>
                        <Text style={styles.label}>日分</Text>
                        <FBox style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FBox style={{ flex: 3 }}>
                                <FPaperSelect name={"dosage-days"} title={"日分"}
                                    selectItems={allDosageDays}
                                    mode={"outlined"}
                                    onChange={(item) => setDosageDays(item)}
                                    outlineStyle={{ backgroundColor: "rgba(255,255,255,.06)" }}
                                    outlineColor={"transparent"}
                                    selectedItem={dosageDays}
                                />
                            </FBox>
                            <FBox style={{ paddingLeft: 20 }}>
                                <Text style={{ color: colors.text }}>日分</Text>
                            </FBox>
                        </FBox>
                    </FBox>

                    {doseTime.map((dose, index) => {
                        return <FBox key={dose.id}>
                            <Divider style={{ marginTop: 25 }} />
                            <FBox>
                                <Text style={styles.label}>服用時間 {index + 1}</Text>
                                <FPaperSelect name={"dist"} title={"選択してください"}
                                    selectItems={Object.values(medTime)}
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
                                        <Text style={{ color: colors.text }}>錠/包(袋)/回</Text>
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
                    }
                    )}

                    <Text style={{ ...styles.addDoseText, color: theme.colors.primary }} onPress={() =>
                        setDoseTime(doseTime => [...doseTime, { dosage: initDose, time: initTime, id: doseTime[doseTime.length - 1].id + 1 }])}>服用時間を追加する</Text>
                </>}
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