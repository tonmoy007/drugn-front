import { ScrollView, Image, StyleSheet } from "react-native";
import { Divider, List, Text, useTheme } from "react-native-paper";
import { colors, RootParamList } from "../../utils/settings";
import { FBox } from "../globals/fbox";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { ReactNode, useState } from "react";
import { CustomIcon } from "../../utils/custom-icon";
import { medIcons, medTime } from "../../utils/constants";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
}

interface Props {
    list: Medicine[];
    swipeable?: boolean;
    recordMed?: boolean;
    rightSwipeAction?: (itemID: any) => ReactNode;
    onLocationSelect?: (index: number, medicine?: Medicine) => void;
}

export const DoseList = ({ list, recordMed, swipeable, rightSwipeAction, onLocationSelect }: Props) => {
    const theme = useTheme()
    const [swiped, setSwiped] = useState<object>({})
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

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
                        onSwipeableRightOpen={() => setSwiped({ ...swiped, [item.id]: true })}
                        onSwipeableClose={() => setSwiped({ ...swiped, [item.id]: false })}
                        key={`view_${item.id}`}
                        enabled={swipeable}
                        childrenContainerStyle={{ opacity: swiped[item.id] ? 0.5 : 1 }}
                    >
                        <TouchableOpacity onPress={() => takeMed(item)}>
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
                            {index < list.length - 1 && !onLocationSelect && <Divider key={`divider_${item.id}`} style={{ borderColor: colors.textDark }} />}
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
        marginBottom: 5,
        marginTop: 5,
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
    }
})