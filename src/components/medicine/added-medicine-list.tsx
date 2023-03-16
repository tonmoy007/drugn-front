import {FBox} from "../globals/fbox";
import {DashboardHeader} from "../home/dashboard/dashboard-header";
import {ActivityIndicator, Button, Divider, List} from "react-native-paper";
import {CustomIcon} from "../../utils/custom-icon";
import {colors, RootParamList} from "../../utils/settings";
import {FlatList, StyleSheet} from "react-native";
import {medIcons, medTime, ScreenWidth} from "../../utils/constants";
import {MaterialIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useRegisterMedsMutation} from "../../api/okusuri";
import {toastMessage} from "../../utils/toast";
import {Background} from "../globals/background";

export const AddedMedicineList = ({navigation, setSubmitted, medicines}) => {
    const [medPreview, setMedPreview] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [registerMed, {isLoading}] = useRegisterMedsMutation()


    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()

    useEffect(() => {
        const allMeds: any[] = Object.values(medicines);
        let previewMeds: any[] = [];
        for (let i = 0; i < allMeds.length; i++) {
            previewMeds.push(...allMeds[i]);
        }
        setMedPreview(previewMeds)
    }, [medicines])

    const handleEditMed = (editID) => {
        nav.navigate("editMedicine", {allMeds: medicines, editID: editID})
    }

    const registerMedicines = async () => {
        setLoading(true);
        const meds: any[] = Object.values(medicines);
        let i = 0;
        while (i < meds.length) {
            let j = 0;
            while (j < meds[i].length) {
                await registerMed({...meds[i][j]}).unwrap().then(res => {
                    if (res.error) {
                        alert(res.message)
                        return;
                    }
                }).catch(err => {
                    toastMessage({msg: err.data?.message ?? "Server Error Response"})
                })
                j++;
            }
            i++;
        }
        if (i >= meds.length) {
            // toastMessage({ msg: 'Success' });
            setSubmitted(true)
        }
    }


    const renderItem = ({index, item}) => {
        return (
            <>
                <FBox style={{flex: 1, width: ScreenWidth - 40, alignItems: "center"}}>
                    <List.Item style={{width: "100%"}} onPress={() => {
                    }} titleStyle={{fontSize: 15, fontWeight: "700", lineHeight: 20}}
                               left={(props) => <FBox
                                   style={{width: 60, alignItems: "center", justifyContent: "center", height: 60}}>
                                   <CustomIcon color={medIcons[item.takeMedicineIconType]} name={"pill"}
                                               size={16}/>
                               </FBox>} title={item.medicineName}
                               description={`${medTime[item.takeMedicineTimeType].value} / ${item.dose}`}
                               descriptionNumberOfLines={2}
                               descriptionStyle={{color: colors.white}}
                               right={() => <FBox style={{height: 60, alignItems: "center", justifyContent: "center"}}>
                                   {!loading && <MaterialIcons name={"chevron-right"} size={24} color={colors.white}
                                                               onPress={() => handleEditMed(item.medicineId)}/>}
                               </FBox>}/>
                    {index < Object.keys(medicines).length - 1 ? (<Divider
                        style={{
                            backgroundColor: colors.white,
                            width: "100%"
                        }}/>) : null}

                </FBox>
            </>
        )
    }
    return (
        <>
            <Background colors={[colors.primary, colors.primary2]} style={{flex: 1}}>
                <DashboardHeader/>
                <FBox style={styles.card}>
                    <FlatList data={medPreview} renderItem={renderItem}/>
                    <FBox style={{flex: 1}}>
                        {!loading && <FBox style={{height: 50, alignItems: "center", justifyContent: "center"}}>
                            <Button mode={"text"} textColor={colors.white}
                                    icon={({color, size}) => <MaterialIcons name={"add-circle-outline"} color={color}
                                                                            size={size}/>}
                                    onPress={() => navigation.navigate("addMedicine", {allMeds: medicines})}>薬を追加登録する</Button>
                        </FBox>}

                    </FBox>
                    <Divider style={{width: "100%", backgroundColor: colors.white}}/>
                    <FBox style={{height: 50, alignItems: "center", justifyContent: "center", marginVertical: 10}}>
                        {loading ?
                            <ActivityIndicator size={'large'} color={colors.primary}/>
                            : <Button textColor={colors.white} mode={"outlined"} style={styles.submit_button}
                                      onPress={registerMedicines}>
                                登録完了</Button>
                        }
                    </FBox>
                </FBox>
                <FBox style={{height: 60}}/>

            </Background>
        </>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "rgba(255,255,255,.2)",
        overflow: "hidden",
        flex: 1,
        borderRadius: 20,
        borderColor: "#FFFFFF",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        marginHorizontal: 20
    },
    submit_button: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        border: "1px solid #FFFFFF",
        borderRadius: 10,
        fontWeight: 500,
    }
})
