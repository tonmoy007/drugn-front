import {Image} from "react-native"
import {Button, Text} from "react-native-paper"
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from "@react-navigation/native";
import {RootParamList} from "../../utils/settings";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {FBox} from "../../components/globals/fbox";


export const UnAuthLanding = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootParamList>>()
    const signInUrl: any = "signin"
    const signUpUrl: any = "signup"
    return (
        <FBox style={{flex: 1}}>
            <LinearGradient
                style={{width: "100%", display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}
                colors={["#4BA9BE", "#0A062B"]} start={{x: 0, y: 0}} end={{x: .6, y: .2}} locations={[0, .6]}>
                <FBox style={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "space-around",
                    flex: 1,
                    padding: 10,
                    width: "100%"
                }}>
                    <FBox style={{display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Image style={{width: 142, height: 161}}
                               source={require("../../../assets/images/Drugn_logo_white.png")}></Image>
                    </FBox>
                    <FBox style={{display: "flex", flex: .2}}>
                        <Button mode="contained" onPress={() => {

                            navigation.navigate(signUpUrl)
                        }}
                                style={{width: "100%", marginBottom: 12, borderRadius: 5}}>Sign Up</Button>
                        <Button mode="text" textColor="#ffffff" onPress={() => {
                            navigation.navigate(signInUrl)
                        }}>I already have an account</Button>
                    </FBox>

                </FBox>
            </LinearGradient>
        </FBox>
    )
}