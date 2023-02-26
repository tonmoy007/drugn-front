import {FBox} from "../../globals/fbox";
import {Image} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {CustomIcon} from "../../../utils/custom-icon";
import {colors, RootParamList} from "../../../utils/settings";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../../utils/store/user";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

interface Props {
    title: string;
    wallet: number;
    icon?: string;
}

export const DashboardHeader = (props: Props) => {
    const [hasNoti, setHasNoti] = useState(true)
    const dispatch = useDispatch()
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onNotiPress = async () => {
        dispatch(logout())
        await navigation.navigate( "signin")
    }
    return (
        <FBox style={{flexDirection: "row", padding: 18, alignItems: "center", paddingBottom: 10}}>
            <FBox style={{paddingRight: 10}}><Image source={require("../../../../assets/images/Face.svg")}
                                                    style={{width: 32, height: 32}}/></FBox>
            <FBox style={{flexDirection: "column", flex: 1}}>
                <Text style={{
                    color: colors.mutedWhite,
                    fontSize: 12,
                    fontWeight: "500",
                    lineHeight: 17
                }}>{props.title}</Text>
                <FBox style={{flexDirection: "row", marginTop: 2, alignItems: "center"}}>
                    <CustomIcon name={"nft"} size={20} color={colors.white} style={{paddingRight: 10}}/>
                    <Text style={{fontFamily: "Montserrat_700Bold", fontSize: 18, lineHeight: 22}}>{props.wallet}</Text>
                </FBox>
            </FBox>
            <FBox>
                {hasNoti ? (<IconButton onPress={onNotiPress}
                                        icon={({size, color}) => (
                                            <Image source={require("../../../../assets/icons/bell-badge.svg")}
                                                   style={{width: 32, height: 32}}/>)}/>) : (
                    <IconButton icon={"bell"} onPress={onNotiPress} iconColor={colors.white}/>)}
            </FBox>
        </FBox>
    )
}