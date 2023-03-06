import { FBox } from "../../globals/fbox";
import { Divider, List, Text } from "react-native-paper";
import { colors, RootParamList } from "../../../utils/settings";
import { CustomIcon } from "../../../utils/custom-icon";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { jpTime, medIcons, medTime } from "../../../utils/constants";
import moment from "moment";

export const SliderLists = ({ data, time }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const today = moment().format('MM/DD');
    const day = moment().format('dddd').substring(0, 3)
    const iconTime = {
        afternoon: 'sunny',
        night: 'moon',
        any: 'dinner'
    }
    return (
        <FBox >
            {data.slice(0, 3).map((item, i) => {
                return i === 0 ? (
                    <TouchableOpacity key={`slider_list-item${i}`} onPress={() => {
                        navigation.navigate("recordMedicine", { medData: item })
                    }} activeOpacity={.9}>
                        <LinearGradient colors={['#47C3E8', '#48A8EF']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            shadowColor: "#444444",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: .6,
                            shadowRadius: 5
                        }}>
                            <FBox style={{ padding: 18, flexDirection: "row" }}>
                                <FBox style={{ flex: 1 }}>
                                    <Text variant={"bodyMedium"} style={{ marginBottom: 10 }}>{`今日 ${today}(${day}) ${jpTime[time]}`}</Text>
                                    <List.Item key={`slider-item-${i}`} style={{ marginHorizontal: 18 }} onPress={() => {
                                        navigation.navigate("recordMedicine", { medData: item })
                                    }} titleStyle={{ fontSize: 15, fontWeight: "700", lineHeight: 20 }}
                                        left={(props) => <CustomIcon size={28} color={colors.white} name={"pill-outlined"} />} title={item.medicine_name}
                                        description={`${medTime[item.take_medicine_time_type].value} / ${item.dose}`}
                                        descriptionStyle={{ color: colors.white }} />
                                </FBox>
                                <FBox>
                                    {time === 'morning' ? <CustomIcon name={'sunrise'} color={"white"} size={56} />
                                        :
                                        <Image source={require(`../../../../assets/icons/${iconTime[time]}.svg`)} style={{ width: 56, height: 56 }} />
                                    }
                                </FBox>
                                <FBox />
                            </FBox>
                        </LinearGradient>
                    </TouchableOpacity>
                ) : (
                    <FBox key={`item-list-${i}`} style={{ flex: 1, width: "100%" }}>
                        <List.Item key={`slider-item-${i}`} style={{ marginHorizontal: 18 }} onPress={() => {
                            navigation.navigate("recordMedicine", { medData: item })
                        }} titleStyle={{ fontSize: 15, fontWeight: "700", lineHeight: 20 }}
                            left={(props) => <CustomIcon color={medIcons[item.medicine_icon_type]} name={"pill"}
                                size={16} />} title={item.medicine_name}
                            description={`${medTime[item.take_medicine_time_type].value} / ${item.dose}`}
                            descriptionStyle={{ color: colors.white }} />
                        {!item.active && i != data.length - 1 && i < 2 ? (<Divider key={`divider_${i}`}
                            style={{
                                backgroundColor: colors.white,
                                width: "90%",
                                marginLeft: '5%'
                            }} />) : null}

                    </FBox>
                )
            })}
        </FBox>
    )
}