import {useSelector} from "react-redux";
import {FBox} from "../globals/fbox";
import {DoseList} from "./dose-list";
import {GlobalState} from "../../utils/store/global";
import {useEffect, useState, Fragment} from 'react'
import {useDeleteMedMutation, useFetchMedsQuery} from "../../api/okusuri";
import {toastMessage} from "../../utils/toast";
import {colors, RootParamList} from "../../utils/settings";
import {Image, StyleSheet} from 'react-native'
import {ActivityIndicator, Button, Card, IconButton, Text, useTheme} from "react-native-paper";
import {TouchableOpacity} from "react-native-gesture-handler";
import {MaterialIcons} from "@expo/vector-icons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/core";
import {userMedTime} from "../../utils/functions/medicines";
import moment from "moment";
import {jpTime, ScreenWidth, timeDets} from "../../utils/constants";
import {LinearGradient} from "expo-linear-gradient";
import {CustomIcon} from "../../utils/custom-icon";

export const ManageUserMeds = ({delMed, history}) => {
    const user = useSelector((state: GlobalState) => state.user)
    const {data: meds, isLoading, isFetching, error} = useFetchMedsQuery({userId: user.id ?? 0})
    const [deleteMed, {}] = useDeleteMedMutation()
    const [deleting, setDeleting] = useState<string>('')
    const [medList, setMedList] = useState<any>({morning: [], afternoon: [], night: []})
    const [timeIDs, setTimeIDs] = useState<object>({morning: [], afternoon: [], night: []})
    const [activeTime, setActiveTime] = useState<string>('morning');
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const today = moment().format('MM/DD');
    const day = moment().format('dddd').substring(0, 3);
    const [curTab, setCurTab] = useState<string>(delMed ? 'morning' : activeTime)
    const [medHistory, setMedHistory] = useState<any>([])

    const theme = useTheme();


    useEffect(() => {
        if (meds?.medicines) {
            getAllUserMeds(meds.medicines);
        }
        medList
    }, [meds])


    async function getAllUserMeds(userMeds) {
        const allMeds = await userMedTime({medicines: userMeds})
        setMedList(allMeds.medList)
        setTimeIDs(allMeds.timeIDs)
        if (!delMed)
            setActiveTime(allMeds.activeTime)
        if (history) {
            const medHist = [...allMeds.medList.morning, ...allMeds.medList.afternoon, ...allMeds.medList.night]
            setMedHistory(medHist.sort((a: any, b: any) => a.updated_at < b.updated_at ? 1 : -1))
        }
    }

    useEffect(() => {
        setCurTab(activeTime)
    }, [activeTime])

    const deleteMedicine = (itemID) => {
        setDeleting(itemID)
        deleteMed({id: itemID}).unwrap().then(async (res) => {
            if (res.error) {
                toastMessage({msg: res.message}).catch(err => console.log(err));
                return;
            }
            setDeleting('');
        }).catch(err => {
            setDeleting('');
            toastMessage({msg: err.message ?? "Server Error Response"}).catch(err => console.log(err))
        })

    }

    const rightSwipeAction = (itemID) => {
        return (<>
            <FBox style={{alignItems: 'center', justifyContent: 'center', marginRight: 20}}>
                {deleting === itemID ?
                    <ActivityIndicator size={'small'} color={colors.primary}/>
                    :
                    <TouchableOpacity onPress={() => deleteMedicine(itemID)}>
                        <IconButton icon={"trash-can"} iconColor={colors.red}
                                    style={{width: 'inherit', height: 'inherit', margin: 0}}/>
                        <Text style={{color: colors.red}}>消去</Text>
                    </TouchableOpacity>
                }
            </FBox>
        </>)
    }

    if (isLoading || isFetching)
        return (<>
            <FBox style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <ActivityIndicator size={'large'} color={colors.primary}/>
            </FBox>
        </>)

    if (error)
        return (<>
            <FBox style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>Server Error Encountered</Text>
            </FBox>
        </>)

    return (
        <>
            {history && <FBox style={{flex: 1}}>
                <DoseList list={medHistory} swipeable={false} rightSwipeAction={rightSwipeAction} medHistory={true}/>
            </FBox>}
            {!delMed && !history &&
                <>
                    <FBox style={{flex: 1}}>
                        {timeIDs[activeTime]?.length > 0
                            ?
                            <>
                                <Text style={{textAlign: 'center',}}>薬を飲む
                                    今日 {today}({day}) {jpTime[activeTime]}</Text>
                                <DoseList list={[...timeIDs[activeTime]]} swipeable={false}
                                          rightSwipeAction={rightSwipeAction}/>
                            </>
                            :
                            <Text style={{textAlign: 'center', padding: 16}}>
                                お薬の登録ができていないようですか？＋薬を追加登録するから処方されたお薬を飲むスケジュールを登録してください。
                            </Text>
                        }
                    </FBox>
                </>
            }

            {!history && <><Card elevation={1} style={styles.card}>
                <Card.Content style={{padding: 0}}>
                    <FBox style={styles.tabs}>
                        {Object.keys(jpTime).map((time, index) =>
                            <FBox key={time} style={{flex: 1}}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'stretch',
                                        width: '100%',
                                    }}
                                    activeOpacity={.8}
                                    onPress={() => setCurTab(time)}>
                                    <LinearGradient key={'lunch-header'} start={{x: 0.5, y: 0.5}}
                                                    colors={timeDets[time].color}
                                                    style={{
                                                        ...styles.tabContainer,
                                                        flex: 1,
                                                        borderColor: time === curTab ? theme.colors.onPrimary : "transparent"
                                                    }}
                                    >

                                        {time === 'morning' ?
                                            <CustomIcon name='sunrise' size={28} color={theme.colors.onPrimary}/>
                                            :
                                            <Image source={timeDets[time].icon} style={{...styles.tabIcon}}/>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>


                            </FBox>
                        )}

                    </FBox>
                </Card.Content>
            </Card>
                <FBox style={{marginVertical: 10}}>
                    <DoseList list={medList[curTab]} swipeable={true} rightSwipeAction={rightSwipeAction}
                              recordMed={true}/>
                    {medList[curTab].length === 0 &&
                        <Text style={{textAlign: 'center'}}>お薬を飲むスケジュールが登録されていません。</Text>}
                </FBox>

                <FBox style={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <Button mode={"text"} textColor={colors.white}
                            style={{
                                backgroundColor: theme.colors.surfaceDisabled,
                                width: 'max-content',
                                borderRadius: 20
                            }}
                            icon={({color, size}) => <MaterialIcons name={"add-circle-outline"} color={color}
                                                                    size={size}/>}
                            onPress={() => nav.navigate("addMedicine")}>薬を追加登録する</Button>
                </FBox>
            </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background2,
        borderRadius: 10,
        marginTop: 10,
    },
    tabs: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: 'relative',
        flex: 1,
        width: ScreenWidth
    },
    tabContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
        borderWidth: 1,
    },
    tabIcon: {
        width: 28,
        height: 28
    },
    cardDivider: {
        width: 1,
        backgroundColor: colors.textDark,
        opacity: 0.7,
        height: 20
    },
    tabLabelText: {
        fontSize: 16,
        opacity: 0.9,
        margin: '0px',
    },
    tabText: {
        marginTop: 2,
        fontSize: 20,
    },
    itemText: {
        textAlign: 'center'
    }
});