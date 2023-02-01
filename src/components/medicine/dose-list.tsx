import { ScrollView, Image, StyleSheet } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";
import { colors } from "../../utils/settings";
import { FBox } from "../globals/fbox";
import { Swipeable } from "react-native-gesture-handler";
import { ReactNode, useState } from "react";

export interface Medicine {
    id: string | number;
    title: any;
    selected?: boolean;
    description: any;
}

interface Props {
    list: Medicine[];
    swipeable?: boolean;
    rightSwipeAction?: (itemID: any) => ReactNode;
    onLocationSelect?: (index: number, medicine?: Medicine) => void;
}

export const DoseList = ({ list, swipeable, rightSwipeAction, onLocationSelect }: Props) => {
    const theme = useTheme()
    const [swiped, setSwiped] = useState<object>({})

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
                        <FBox><List.Item
                            key={`data_${item.id}`}
                            style={{
                                ...styles.list,
                                borderWidth: onLocationSelect ? 1 : 0,
                                borderColor: !item.selected ? theme.colors.outline : theme.colors.primary,
                            }}
                            title={item.title}

                            description={item.description}
                            onPress={() => onLocationSelect ? onLocationSelect(index, item) : null}
                            descriptionStyle={[styles.desc, {
                                color: theme.colors.onPrimary,
                            }]}
                            left={props => <Image style={[styles.listImage, {
                                backgroundColor: theme.colors.onSecondary
                            }]}
                                source={require("../../../assets/images/Drugn_logo_white.png")} />
                            }
                        />
                            {index < list.length - 1 && !onLocationSelect && <Divider key={`divider_${item.id}`} style={{ borderColor: colors.textDark }} />}
                        </FBox>
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