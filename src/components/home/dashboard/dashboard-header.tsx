import {FBox} from "../../globals/fbox";
import {Image, TouchableOpacity} from "react-native";
import {IconButton, Text} from "react-native-paper";
import {CustomIcon} from "../../../utils/custom-icon";
import {colors, RootParamList} from "../../../utils/settings";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../utils/store/user";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {GlobalState} from "../../../utils/store/global";
import {toastMessage} from "../../../utils/toast";
import {useBalanceQuery} from "../../../api/account";


export const DashboardHeader = () => {
    const [hasNoti, setHasNoti] = useState(true)
    const user = useSelector((state: GlobalState) => state.user)
    const {data: balance, isLoading} = useBalanceQuery({address: user.wallet})
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const onNotiPress = async () => {
        await toastMessage({msg: `Coming soon`})
    }

    const handleWallet = () => {
        if (user && user.loggedIn) {
            if (!user.wallet) {
                navigation.navigate('wallet')
            }
        }
    }


    return (
        <FBox style={{flexDirection: "row", padding: 18, alignItems: "center", paddingBottom: 10}}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Account")
            }} style={{paddingRight: 10}}><Image source={require("../../../../assets/images/Face.svg")}
                                                 style={{width: 32, height: 32}}/></TouchableOpacity>
            <FBox style={{flexDirection: "column", flex: 1}}>
                <Text style={{
                    color: colors.mutedWhite,
                    fontSize: 12,
                    fontWeight: "500",
                    lineHeight: 17
                }}>{user?.name ?? user?.username ?? ""}</Text>
                <FBox style={{flexDirection: "row", marginTop: 2}}>
                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={handleWallet}>
                        <CustomIcon name={"nft"} size={20} color={colors.white} style={{paddingRight: 10}}/>
                        {user?.wallet ?
                            <Text style={{
                                fontFamily: "Montserrat_700Bold",
                                fontSize: 18,
                                lineHeight: 22
                            }}>{balance?.amount ?? 0}</Text>
                            :
                            <Text style={{fontFamily: "Montserrat_700Bold", fontSize: 14, lineHeight: 22}}>Add
                                wallet</Text>
                        }</TouchableOpacity>
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