import {FBox} from "../../globals/fbox";
import {NftProgress} from "../../globals/nft-progress";
import {FlatList, Image, StyleSheet, TouchableOpacity} from "react-native";
import {useTheme} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootParamList} from "../../../utils/settings";

export const DashboardNftHealth = ({active}) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const bars = [{'name': 'Efficiency', 'value': 0.8}, {'name': 'Luck', 'value': 0.8},
        {'name': 'Comfort', 'value': 0.4}, {'name': 'Resilience', 'value': 0.6}]
    return (
        <TouchableOpacity activeOpacity={.8} style={styles.med_container} onPress={() => {
            navigation.navigate("freeNFT")
        }}>
            <FBox style={{flex: 1}}>
                <FlatList data={bars} renderItem={({item}) => {
                    return <NftProgress item={item} active={false}/>
                }}/>
            </FBox>
            <FBox style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Image source={require("../../../../assets/icons/medicine-add.svg")} style={styles.add_med}/>
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
        backgroundColor: "rgba(255,255,255,.01)"
    }
})