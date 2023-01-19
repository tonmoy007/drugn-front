import {FBox} from "../../globals/fbox";
import {Divider, List} from "react-native-paper";
import {colors} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";

export const SliderLists=()=>{
    return (
        <FBox style={{}}>
            {Array(3).fill(0).map((item, i) => {
                return (
                    <FBox key={`item-list-${i}`} style={{flex:1,width:"100%"}}>
                        {i != 0 && (<Divider key={`divider_${i}`}  style={{backgroundColor: colors.white,width:"90%",marginLeft:'5%'}}/>)}
                        <List.Item key={`slider-item-${i}`} style={{marginHorizontal:18}} onPress={() => {
                        }} titleStyle={{fontSize: 15, fontWeight: "700", lineHeight: 20}}
                                   left={(props) => <CustomIcon color={colors.white} name={"pill"}
                                                                size={24}/>} title={"１ダイアモックス錠250mg"}
                                   description={"三和化学研究テキストテキスト"}/>
                    </FBox>
                )
            })}
        </FBox>
    )
}