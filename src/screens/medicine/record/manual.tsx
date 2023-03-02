import { FBox } from "../../../components/globals/fbox";
import { ScrollView, StyleSheet } from "react-native";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { colors } from "../../../utils/settings";
import { FPaperSelect, SelectItem } from "../../../components/globals/select";
import { useEffect, useState } from "react";

const data = [{ value: "朝：食前 1", label: "朝：食前 1" }, {
    label: "朝：食前 2",
    value: "朝：食前2"
}, { label: "朝：食前 3", value: "朝：食前3" }]

const dosages = [{ value: '1', label: '1' }, { value: '2', label: '2' }];
export const RecordMedManual = ({ navigation }) => {
    const { handleSubmit, control, setValue } = useForm()
    const [doseTime, setDoseTime] = useState<SelectItem | undefined>()
    const [dose, setDose] = useState<SelectItem | undefined>()
    const theme = useTheme()
    const [completed, setCompleted] = useState<boolean>(false)

    useEffect(() => {
        setCompleted(!!(doseTime && dose && control._formValues.medName));
    }, [doseTime, dose, control._formValues.medName])

    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={theme.colors.onPrimary} onPress={handleBackNav} />
            ),
            headerRight: () => {
                return (
                    <Text style={{
                        ...styles.text, color: completed ? theme.colors.primary : theme.colors.onSurfaceDisabled
                    }} onPress={handleNextNav}>次へ</Text >
                )
            }
        });
    }, [completed]);

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('recordMedicine')
    }

    const handleNextNav = () => {
        if (completed)
            navigation.push('deleteMedicine')
    }

    return (
        <FBox>
            <ScrollView>
                <FBox style={{
                    flex: 1,
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
                                        defaultValue=''
                                        outlineStyle={{ borderWidth: 0, backgroundColor: "rgba(255,255,255,.07)" }}
                                        onChangeText={(e) => {
                                            setCompleted(!completed)
                                            field.onChange(e)
                                        }} onBlur={field.onBlur} value={field.value}
                                        ref={field.ref} error={Boolean(fieldState.error)} placeholder={"薬の名前"} />
                                </>
                            )
                        }} name={"medName"} control={control} />
                    </FBox>

                    <FBox>
                        <Text style={styles.label}>服用時間</Text>
                        <FPaperSelect name={"dist"} title={"選択してください"}
                            selectItems={data}
                            mode={"outlined"}
                            onChange={(item) => setDoseTime(item)}
                            outlineStyle={{ backgroundColor: "rgba(255,255,255,.06)" }}
                            outlineColor={"transparent"}
                            selectedItem={doseTime}
                        />
                    </FBox>

                    <FBox>
                        <Text style={styles.label}>服用数</Text>
                        <FBox style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <FBox style={{ flex: 3 }}>
                                <FPaperSelect name={"dosage"} title={"選択してください"}
                                    selectItems={dosages}
                                    mode={"outlined"}
                                    onChange={(item) => setDose(item)}
                                    outlineStyle={{ backgroundColor: "rgba(255,255,255,.06)" }}
                                    outlineColor={"transparent"}
                                    selectedItem={dose}
                                />
                            </FBox>
                        </FBox>
                    </FBox>
                </FBox >
            </ScrollView >

        </FBox>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        color: colors.textSemiDark,
        fontSize: 18,
        marginTop: 15
    },
    text: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
});