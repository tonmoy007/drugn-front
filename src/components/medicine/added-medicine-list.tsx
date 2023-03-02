import {FBox} from "../globals/fbox";
import {DashboardHeader} from "../home/dashboard/dashboard-header";
import {Button, Divider, List} from "react-native-paper";
import {CustomIcon} from "../../utils/custom-icon";
import {colors} from "../../utils/settings";
import {FlatList, StyleSheet} from "react-native";
import {ScreenWidth} from "../../utils/constants";
import {MaterialIcons} from "@expo/vector-icons";

const medicineData = [
    {
        time: '今日 11/30(水) 朝',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: 'sunrise',
        active: true,
    },
    {
        time: '朝食前 / 2錠',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: '',
        active: false,
        color: '#FFA5FB'
    },
    {
        time: '朝食前 / 2錠',
        title: '１ダイアモックス錠250mg',
        description: '三和化学研究テキストテキスト',
        rightIcon: '',
        active: false,
    }
]
export const AddedMedicineList = ({navigation, setSubmitted}) => {
    const renderItem = ({index, item}) => {
        return (
            <>
                <FBox style={{flex: 1, width: ScreenWidth - 40, alignItems: "center"}}>
                    <List.Item style={{width: "100%"}} onPress={() => {
                    }} titleStyle={{fontSize: 15, fontWeight: "700", lineHeight: 20}}
                               left={(props) => <FBox
                                   style={{width: 60, alignItems: "center", justifyContent: "center", height: 60}}>
                                   <CustomIcon color={item.color ?? colors.white} name={"pill"}
                                               size={16}/>
                               </FBox>} title={item.title}
                               description={item.description + '\n' + item.time} descriptionNumberOfLines={2}
                               descriptionStyle={{color: colors.white}}
                               right={() => <FBox style={{height: 60, alignItems: "center", justifyContent: "center"}}>
                                   <MaterialIcons name={"chevron-right"} size={24} color={colors.white}/>
                               </FBox>}/>
                    {index < medicineData.length - 1 ? (<Divider
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
            <FBox style={{flex: 1}}>
                <DashboardHeader/>
                <FBox style={styles.card}>
                    <FlatList data={medicineData} renderItem={renderItem}/>
                    <FBox style={{flex: 1}}>
                        <Button textColor={colors.white} mode={"outlined"} style={styles.submit_button}
                                onPress={() => setSubmitted(true)}>
                            登録完了</Button>
                    </FBox>
                    <Divider style={{width: "100%", backgroundColor: colors.white}}/>
                    <FBox style={{height: 50, alignItems: "center", justifyContent: "center"}}>
                        <Button  mode={"text"} textColor={colors.white}
                                icon={({color, size}) => <MaterialIcons name={"add-circle-outline"} color={color}
                                                                        size={size}/>}
                                onPress={() => navigation.navigate("addMedicine")}>薬を新規登録する</Button>
                    </FBox>
                </FBox>
                <FBox style={{height: 60}}/>

            </FBox>
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
        background: "rgba(255, 255, 255, 0.2)",
        border: "1px solid #FFFFFF",
        borderRadius: 10,
        fontWeight: 500,
    }
})
