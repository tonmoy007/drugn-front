import { FBox } from "../../components/globals/fbox";
import { Button, Text, useTheme } from "react-native-paper";
import { useState, useEffect } from "react";
import {StyleSheet, Image, ScrollView} from 'react-native'
import StepTracker from "../../components/globals/step";
import Wallet from "../../components/wallet";
import WalletName from "../../components/wallet/wallet-name";
import WalletDetails from "../../components/wallet/wallet-details";
import { useSelector } from "react-redux";
import { GlobalState } from "../../utils/store/global";

export const NewWallet = ({ route, navigation }) => {
    const [completed, setCompleted] = useState<boolean>(false)
    const [curStep, setCurStep] = useState<number>(0);
    const [userWallet, setUserWallet] = useState<any>({});
    const user = useSelector((state: GlobalState) => state.user)


    const theme = useTheme();

    useEffect(() => {
        if (completed)
            navigation.setOptions({
                headerTitleAlign: 'center',
                headerLeft: () => {
                    return (<></>)
                },
                headerRight: () => {
                    return (<></>)
                }
            });
    }, [completed]);

    return (
        <>
            <FBox style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}>
                <FBox style={{ padding: 20, width: '100%' }}>
                    <StepTracker step={completed ? 3 : curStep} maxSteps={3} setStep={setCurStep} />
                </FBox>
                <ScrollView>
                    {curStep === 2 && !completed ?
                        <WalletDetails setCompleted={setCompleted} navigation={navigation} setStep={setCurStep} userWallet={userWallet} />
                        :
                        <FBox style={{ width: '100%', paddingHorizontal: 20, flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                            {curStep === 0 && <Wallet nextStep={1} setStep={setCurStep} navigation={navigation} />}
                            {curStep === 1 && <WalletName nextStep={2} setStep={setCurStep} navigation={navigation} user={user} setUserWallet={setUserWallet} />}
                            {curStep === 2 && completed && <>
                                <FBox style={{ flex: 2, alignItems: 'center' }}>
                                    <Text variant={"titleLarge"} style={{ fontWeight: '700', marginBottom: 20 }}>Walletの作成
                                        完了いたしました</Text>
                                    <FBox style={{ marginTop: 30 }}>
                                        <Image source={require("../../../assets/icons/bag_bg.svg")} style={{ width: 250, height: 250 }} />
                                    </FBox>
                                </FBox>
                                <FBox style={{ width: '100%' }}>
                                    <Button style={{ ...styles.button, backgroundColor: theme.colors.primary }}
                                            labelStyle={{ color: theme.colors.onPrimary }} onPress={() => navigation.replace('freeNFT')}
                                    >NFTを受け取る</Button>

                                    <FBox style={{ width: '100%', paddingBottom: 30 }}>
                                        <Button icon={"help-circle-outline"} mode={"outlined"}
                                                style={styles.help} labelStyle={{ color: theme.colors.onPrimary }} onPress={() => { }}>プライベートキーとは?
                                        </Button>
                                        <Button icon={"help-circle-outline"} mode={"outlined"}
                                                style={styles.help} labelStyle={{ color: theme.colors.onPrimary }} onPress={() => { }}>プライベートキーを無くしたらどうなりますか?
                                        </Button>
                                    </FBox>
                                </FBox>
                            </>}
                        </FBox>}
                </ScrollView>
            </FBox>
        </>
    )
}

const styles = StyleSheet.create({
    navText: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    button: {
        width: '100%',
        borderRadius: 1
    },
    help: {
        alignSelf: 'flex-start',
        borderRadius: 0,
        border: 0,
        padding: 0,
        height: 20,
        marginBottom: 10
    },
})