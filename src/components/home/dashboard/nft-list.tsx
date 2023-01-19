import {Divider, List, Text} from "react-native-paper";
import {FBox} from "../../globals/fbox";
import {Entypo} from "@expo/vector-icons";
import {colors} from "../../../utils/settings";

export const NftList = () => {
    const list = ['Axie Infinity', 'Theta', 'Flow']
    return (
        <FBox style={{marginTop: 12}}>
            <Text style={{fontFamily: "Montserrat_700Bold",marginLeft:18}} variant={"titleMedium"}>NFT一覧</Text>
            <FBox style={{marginTop: 12}}>
                {list.map((item,index) => {
                    return (
                        <FBox key={item}>
                            <Divider/>
                            <List.Item titleStyle={{fontSize:14,lineHeight:17}} onPress={() => {
                            }} style={{}} title={item}
                                       right={() => <Entypo name="chevron-right" size={18} color={colors.white}/>}/>
                        </FBox>
                    )
                })}
                <Divider/>
            </FBox>
        </FBox>
    )
}