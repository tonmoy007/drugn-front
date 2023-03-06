import { useSelector } from "react-redux";
import { FBox } from "../../components/globals/fbox";
import { DoseList } from "../../components/medicine/dose-list";
import { GlobalState } from "../../utils/store/global";
import { useEffect, useState } from 'react'
import { useDeleteMedMutation, useFetchMedsQuery } from "../../api/okusuri";
import { toastMessage } from "../../utils/toast";
import { colors, RootParamList } from "../../utils/settings";
import { ActivityIndicator, Button, Divider, IconButton, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/core";
import { userMedTime } from "../../utils/functions/medicines";
import moment from "moment";
import { jpTime } from "../../utils/constants";

export const ManageUserMeds = ({ delMed }) => {
    const user = useSelector((state: GlobalState) => state.user)
    const { data: meds, isLoading, error } = useFetchMedsQuery({ userId: user.id ?? 0 })
    const [deleteMed, { }] = useDeleteMedMutation()
    const [deleting, setDeleting] = useState<boolean>(false)
    const [medList, setMedList] = useState<any>([])
    const [showAll, setShowAll] = useState<boolean>(true)
    const [timeIDs, setTimeIDs] = useState<object>({
        morning: [],
        afternoon: [],
        night: [],
        any: []
    })
    const [activeTime, setActiveTime] = useState<string>('morning');
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const today = moment().format('MM/DD');
    const day = moment().format('dddd').substring(0, 3)

    useEffect(() => {
        if (meds?.medicines) {
            getAllUserMeds(meds.medicines);
        }
    }, [meds])

    async function getAllUserMeds(userMeds) {
        setMedList(userMeds)
        const allMeds = await userMedTime({ medicines: userMeds })
        setActiveTime(allMeds.activeTime)
        setTimeIDs(allMeds.timeIDs)
    }

    const deleteMedicine = (itemID) => {
        setDeleting(true)
        deleteMed({ id: itemID }).unwrap().then(async (res) => {
            if (res.error) {
                toastMessage({ msg: res.message });
                return;
            }
            setMedList(medList.filter(item => item.id !== itemID));
            setDeleting(false);
        }).catch(err => {
            setDeleting(false);
            toastMessage({ msg: err.message ?? "Server Error Response" })
        })

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

    if (isLoading)
        return (<>
            <FBox style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={colors.primary} />
            </FBox>
        </>)

    if (error)
        return (<>
            <FBox style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>Server Error Encountered</Text>
            </FBox>
        </>)

    return (
        <>
            {deleting ?
                <ActivityIndicator size={'large'} color={colors.primary} />
                :
                <>
                    {!delMed &&
                        <>
                            {timeIDs[activeTime]?.length > 0
                                ?
                                <>
                                    <Text style={{ textAlign: 'center', }}>薬を飲む 今日 {today}({day}) {jpTime[activeTime]}</Text>
                                    <DoseList list={timeIDs[activeTime]} swipeable={delMed} rightSwipeAction={rightSwipeAction} />
                                </>
                                :
                                <Text style={{ textAlign: 'center', }}>予定された薬はありません。後で戻ってきてください</Text>
                            }
                            <Divider />
                        </>
                    }
                    {(showAll || delMed) && <>
                        {medList.length > 0 ?
                            <FBox style={{ marginTop: 10 }}>
                                {!delMed && <Text style={{ marginTop: 20, textAlign: 'center' }}>すべての薬</Text>}
                                <DoseList list={medList} swipeable={delMed} rightSwipeAction={rightSwipeAction} recordMed={true} />
                            </FBox>
                            :
                            <FBox style={{ justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                                <Text style={{ textAlign: 'center' }}>あなたは薬を持っていません</Text>
                                <Button mode={"text"} textColor={colors.white}
                                    icon={({ color, size }) => <MaterialIcons name={"add-circle-outline"} color={color}
                                        size={size} />}
                                    onPress={() => nav.navigate("addMedicine")}>薬を追加登録する</Button>
                            </FBox>
                        }
                    </>
                    }
                </>
            }
        </>
    )
}