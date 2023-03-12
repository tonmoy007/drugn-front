import {useSelector} from "react-redux";
import {FBox} from "../../components/globals/fbox";
import {DoseList} from "../../components/medicine/dose-list";
import {GlobalState} from "../../utils/store/global";
import {useEffect, useState, Fragment} from 'react'
import {useDeleteMedMutation, useFetchMedsQuery} from "../../api/okusuri";
import {toastMessage} from "../../utils/toast";
import {colors, RootParamList} from "../../utils/settings";
import {StyleSheet} from 'react-native'
import {ActivityIndicator, Button, Card, Divider, IconButton, Text, useTheme} from "react-native-paper";
import {TouchableOpacity} from "react-native-gesture-handler";
import {MaterialIcons} from "@expo/vector-icons";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useNavigation} from "@react-navigation/core";
import {userMedTime} from "../../utils/functions/medicines";
import moment from "moment";
import {jpTime} from "../../utils/constants";

export const ManageUserMeds = ({delMed, history}) => {
    const user = useSelector((state: GlobalState) => state.user)
    const {data: meds, isLoading, isFetching, error} = useFetchMedsQuery({userId: user.id ?? 0})
    const [deleteMed, {}] = useDeleteMedMutation()
    const [deleting, setDeleting] = useState<string>('')
    const [medList, setMedList] = useState<any>({morning: [], afternoon: [], night: [], any: []})
    const [timeIDs, setTimeIDs] = useState<object>({morning: [], afternoon: [], night: [], any: []})
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
    }, [meds])


    async function getAllUserMeds(userMeds) {
        const allMeds = await userMedTime({medicines: userMeds})
        setMedList(allMeds.medList)
        setTimeIDs(allMeds.timeIDs)
        if (!delMed)
            setActiveTime(allMeds.activeTime)
        if (history) {
            const medHist = [...allMeds.medList.morning, ...allMeds.medList.afternoon, ...allMeds.medList.night, ...allMeds.medList.any,]
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
                toastMessage({msg: res.message}).catch(err=>console.log(err));
                return;
            }
            setDeleting('');
        }).catch(err => {
            setDeleting('');
            toastMessage({msg: err.message ?? "Server Error Response"}).catch(err=>console.log(err))
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
                        {timeIDs[activeTime]?.length > 0 || timeIDs['any'].length > 0
                            ?
                            <>
                                <Text style={{textAlign: 'center',}}>薬を飲む
                                    今日 {today}({day}) {jpTime[activeTime]}</Text>
                                <DoseList list={[...timeIDs[activeTime], ...timeIDs['any']]} swipeable={false}
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
                            <Fragment key={time}>
                                <Button style={{
                                    ...styles.tabContainer,
                                    flex: 1,
                                    backgroundColor: time === curTab ? theme.colors.primary : 'inherit',
                                    borderRadius: time === curTab ? 10 : 0
                                }}
                                        onPress={() => setCurTab(time)}>
                                    <Text
                                        style={{...styles.tabText, color: theme.colors.onPrimary}}>{jpTime[time]}</Text>
                                </Button>
                                {index < Object.keys(jpTime).length - 1 && time !== curTab &&
                                    <FBox style={styles.cardDivider}></FBox>}
                            </Fragment>
                        )}

                    </FBox>
                </Card.Content>
            </Card>
                <FBox style={{marginVertical: 10}}>
                    <DoseList list={medList[curTab]} swipeable={true} rightSwipeAction={rightSwipeAction}
                              recordMed={true}/>
                    {medList[curTab].length === 0 && <Text style={{textAlign: 'center'}}>あなたは薬を持っていません</Text>}
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
    },
    tabContainer: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 5,
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