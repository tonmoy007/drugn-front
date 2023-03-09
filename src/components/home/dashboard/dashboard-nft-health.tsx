import { FBox } from "../../globals/fbox";
import { NftProgress } from "../../globals/nft-progress";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../../utils/settings";
import { useUserDataQuery } from "../../../api/account";
import { ActivityIndicator } from "react-native-paper";

export const DashboardNftHealth = ({ userID }) => {
    const { data: userData, isLoading } = useUserDataQuery({ userId: userID })
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const bars = [{ 'name': 'Efficiency', 'value': 1 }, { 'name': 'Luck', 'value': 1 },
    { 'name': 'Comfort', 'value': 1 }, { 'name': 'Resilience', 'value': 1 }]

    if (isLoading)
        return (
            <TouchableOpacity activeOpacity={.8} style={styles.med_container}>
                <FBox style={{ flex: 1 }}>
                    <ActivityIndicator />
                </FBox>
            </TouchableOpacity>
        )

    return (
        <TouchableOpacity activeOpacity={.8} style={styles.med_container}
            onPress={() => userData?.is_initial_nft ? {} : navigation.navigate("freeNFT")}>
            <FBox style={{ flex: 1 }}>
                <FlatList data={bars} renderItem={({ item }) => {
                    return <NftProgress item={item} active={userData?.is_initial_nft} />
                }} />
            </FBox>
            <FBox style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                {userData?.is_initial_nft ?
                    <Image source={require("../../../../assets/images/drugn_nft.png")} style={styles.add_med} />
                    :
                    <Image source={require("../../../../assets/icons/medicine-add.svg")} style={styles.add_med} />
                }
            </FBox>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    add_med: {
        width: 150 * .8,
        height: 106 * .8
    },
    med_container: {
        flexDirection: "row",
        margin: 16,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "rgba(0,0,0,.2)"
    }
})