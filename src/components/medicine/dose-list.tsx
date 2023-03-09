import { ScrollView, Image, StyleSheet } from "react-native";
import { Button, Divider, List, Text, useTheme } from "react-native-paper";
import { colors, RootParamList } from "../../utils/settings";
import { FBox } from "../globals/fbox";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { ReactNode, useState, useEffect } from "react";
import { CustomIcon } from "../../utils/custom-icon";
import { medIcons, medTime } from "../../utils/constants";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import moment from "moment";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface Medicine {
    id: string | number;
    name: any;
    selected?: boolean;
    user_id: number;
    medicine_id: number;
    medicine_icon_type: number;
    take_medicine_time_type: number;
    dose: number;
    medicine_name?: string;
    updated_at?: string;
    created_at?: string;
}

interface Props {
    list: Medicine[];
    swipeable?: boolean;
    recordMed?: boolean;
    medHistory?: boolean;
    rightSwipeAction?: (itemID: any) => ReactNode;
    onLocationSelect?: (index: number, medicine?: Medicine) => void;
}

export const DoseList = ({ list, recordMed, swipeable, medHistory, rightSwipeAction, onLocationSelect }: Props) => {
    const theme = useTheme()
    const [swiped, setSwiped] = useState<object>({})
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

    useEffect(() => {
        setSwiped({})
    }, [list])


    const takeMed = (medData) => {
        if (!swipeable && !recordMed) {
            nav.navigate('recordMedicine', { medData })
        }
    }

    return <FBox style={{ flex: 1, position: "relative" }}>
        <ScrollView style={{ maxHeight: "100%" }}>
            <List.Section>
                {list.map((item, index) => {
                    return <Swipeable
                        renderRightActions={() => rightSwipeAction ? rightSwipeAction(item.id) : null}
                        onSwipeableOpen={(direction, swipeable) => {
                            if (direction==="right"){
                                setSwiped({ ...swiped, [item.id]: true })
                            }
                        }}
                        onSwipeableClose={() => setSwiped({ ...swiped, [item.id]: false })}
                        key={`view_${item.id}`}
                        enabled={swipeable}
                        childrenContainerStyle={{ opacity: swiped[item.id] ? 0.5 : 1 }}
                    >
                        <TouchableOpacity onPress={() => takeMed(item)}>
                            {medHistory &&
                                <FBox style={styles.historyDate}><MaterialCommunityIcons name={item.created_at === item.updated_at ? 'bottle-tonic-plus' : 'history'}
                                    color={colors.textSemiDark} size={15} /> <Text
                                        style={{ marginLeft: 10, color: colors.textSemiDark }}
                                    >{`${moment(item.updated_at).format('llll')}(${moment().format('dddd').substring(0, 3)})`}</Text>
                                </FBox>}

                            <List.Item
                                key={`data_${item.id}`}
                                style={{
                                    ...styles.list,
                                    borderWidth: onLocationSelect ? 1 : 0,
                                    borderColor: !item.selected ? theme.colors.outline : theme.colors.primary,
                                }}
                                title={(props) => <Text {...props} numberOfLines={2} ellipsizeMode={'tail'}>{item.medicine_name}</Text>}

                                description={`${medTime[item.take_medicine_time_type].value} / ${item.dose}`}
                                onPress={() => onLocationSelect ? onLocationSelect(index, item) : null}
                                descriptionStyle={[styles.desc, {
                                    color: theme.colors.onPrimary,
                                }]}
                                left={props => <CustomIcon color={medIcons[item.medicine_icon_type]} name={"pill"}
                                    size={16} />}
                            />
                            {index < list.length - 1 && !onLocationSelect && <Divider key={`divider_${item.id}`} style={{ borderColor: colors.textDark, marginVertical: 5 }} />}
                        </TouchableOpacity>
                    </Swipeable>
                })}
            </List.Section>
        </ScrollView>
    </FBox>
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 20
    },
    desc: {
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 20
    },
    listImage: {
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0)",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: .25,
        shadowRadius: 4,
        width: 80,
        height: 80
    },
    historyDate: {
        marginLeft: 20,
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
})