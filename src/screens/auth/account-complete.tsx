import {FBox} from "../../components/globals/fbox";
import {Button, Text, useTheme} from "react-native-paper";
import {Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootParamList} from "../../utils/settings";

export const AccountComplete = (props) => {
    const theme = useTheme()
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>()
    return (
        <FBox style={{flex: 1, paddingHorizontal: 20, alignItems: "center", justifyContent: "center"}}>
            <FBox style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <FBox style={{paddingVertical: 40}}>
                    <Image source={require("../../../assets/icons/account_create_success.svg")}
                           style={{width: 240, height: 260}}/>
                </FBox>
                <Text style={{
                    color: theme.colors.primary,
                    textAlign: "center",
                    fontFamily: "Montserrat_700Bold",
                    fontSize: 24,
                    padding: 20,
                    fontWeight: "700"
                }}>Your Account has been
                    created</Text>
            </FBox>
            <FBox style={{minHeight: 120, width: "100%", alignItems: "center", justifyContent: "center"}}>
                <Button theme={{roundness: 1}} mode={"contained"} onPress={() => {
                    nav.navigate("storeRegistration")
                }}>お薬を受け取る薬局を指定します</Button>
            </FBox>
        </FBox>
    )

}