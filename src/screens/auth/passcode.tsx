import { FBox } from "../../components/globals/fbox";
import { OtpInput } from "../../components/auth/otp-input";
import { Text, useTheme } from "react-native-paper";
import { useCallback, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../utils/settings";
import { StyleSheet } from 'react-native'

export const DevicePasscode = ({ navigation }) => {
    const [passcode, setPasscode] = useState<string>("")
    const theme = useTheme();

    const onPinReady = useCallback((status) => {
        if (status) {
            if (passcode === '123456')
                navigation.push('wallet')
            else
                setPasscode('')
        }
    }, [passcode])


    useEffect(() => {
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerRight: () => {
                return (
                    <Text style={{ ...styles.text, color: theme.colors.onSurfaceDisabled }} onPress={handleNextNav}>次へ</Text >
                )
            }
        });
    }, []);

    const handleNextNav = () => {
        navigation.push('deleteMedicine')
    }


    return (
        <FBox style={{ flex: 1, alignItems: "center", justifyContent: "flex-start", padding: 20 }}>
            <FBox style={{ flexDirection: "column", paddingTop: 80, maxWidth: 600, alignItems: "center" }}>
                <Text variant={"titleMedium"} style={{ marginBottom: 5 }}>Device Passcode</Text>
                <Text variant={"bodySmall"}
                    style={{ marginBottom: 50 }}>Set your NFT Wallet device passcode</Text>

                <FBox style={{ marginBottom: 20, width: "100%" }}>
                    <OtpInput code={passcode} setCode={setPasscode} maximumLength={6} setIsPinReady={onPinReady} isPasscode={true} />
                </FBox>
            </FBox>
        </FBox>
    )
}

const styles = StyleSheet.create({
    text: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
})