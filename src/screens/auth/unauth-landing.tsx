import { Image, View } from "react-native"
import { Button, Text } from "react-native-paper"
import { LinearGradient } from 'expo-linear-gradient';


export const UnAuthLanding = () => {
    return (
        <LinearGradient style={{ width: "100%", display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }} colors={["#4BA9BE", "#0A062B"]} start={{ x: 0, y: 0 }} end={{ x: .6, y: .2 }} locations={[0, .6]}>
            <View style={{ display: "flex", alignItems: "stretch", justifyContent: "space-around", flex: 1, padding: 10, width: "100%" }}>
                <View style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <Image style={{ width: 142, height: 161 }} source={require("../../../assets/images/Drugn_logo_white.png")}></Image>
                </View>
                <View style={{ display: "flex", flex: .2 }}>
                    <Button mode="contained" onPress={() => { }} style={{ width: "100%", marginBottom: 12, borderRadius: 5 }}>Sign Up</Button>
                    <Button mode="text" textColor="#ffffff">I already have an account</Button>
                </View>

            </View>
        </LinearGradient>
    )
}