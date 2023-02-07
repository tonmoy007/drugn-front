import { Divider, List, Text } from "react-native-paper";
import { FBox } from "../../globals/fbox";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../utils/settings";
import { FlatList } from "react-native";

export const NftList = () => {
    const list = ['お薬', 'お水', 'お薬箱', 'お薬バッグ', 'AIキャラクタ']
    return (
        <FBox style={{ marginTop: 12 }}>
            <Text style={{ fontFamily: "Montserrat_700Bold", marginLeft: 18 }} variant={"titleMedium"}>NFT一覧</Text>
            <FBox style={{ marginTop: 12 }}>
                <FlatList data={list} renderItem={({ item, index }) => {
                    return (
                        <FBox key={item}>
                            <Divider />
                            <List.Item titleStyle={{ fontSize: 14, lineHeight: 17 }} onPress={() => {
                            }} style={{}} title={item}
                                right={() => <Entypo name="chevron-right" size={18} color={colors.white} />} />
                        </FBox>
                    )
                }} />
                <Divider />
            </FBox>
        </FBox>
    )
}