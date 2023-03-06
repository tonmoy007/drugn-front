import { StyleSheet, Image } from 'react-native';
import { useTheme, Text, TextInput } from 'react-native-paper';
import { colors } from '../../utils/settings';
import { FBox } from '../globals/fbox';
import { useState, useEffect } from 'react'
import { useNewAccountMutation } from '../../api/account';
import { toastMessage } from '../../utils/toast';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../utils/store/global';

interface Props {
    user: any,
    setUserWallet: (val: object) => void,
    nextStep: number;
    setStep: (val: number) => void,
    navigation
}

export default function WalletName(props: Props) {
    const [walletName, setWalletName] = useState<string>(props.user?.username)
    const [loading, setLoading] = useState<boolean>(false)
    const [newSymbolAcct, { isLoading }] = useNewAccountMutation()
    const user = useSelector((state: GlobalState) => state.user)


    const theme = useTheme()

    useEffect(() => {
        props.navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (<></>)
            },
            headerRight: () => {
                return (
                    <Text style={{ ...styles.navText, color: walletName.length > 0 && !loading ? theme.colors.primary : theme.colors.onSurfaceDisabled }}
                        onPress={handleNextNav}>登録</Text >
                )
            }
        });
    }, [props.nextStep, walletName]);

    const handleNextNav = async () => {
        if (walletName.length > 0 && !loading) {
            setLoading(true);
            //create Account here
            newSymbolAcct({ userId: user.id }).unwrap().then(async (res) => {
                if (res.error) {
                    toastMessage({ msg: res.message });
                    return;
                }
                props.setUserWallet({ address: res.address, privateKey: res.privateKey, base64Qr: res.base64Qr });
                props.setStep(props.nextStep);
            }).catch(err => {
                console.log(err)
                toastMessage({ msg: err.message ?? "Server Error Response" })
            })
        }
    }

    return (
        <FBox style={styles.container}>
            <Text variant={"titleLarge"} style={{ ...styles.text, fontWeight: '700', marginBottom: 20 }}>Walletの表示名を設定してください</Text>
            <TextInput
                style={{ width: '100%' }}
                editable={false}
                onChangeText={setWalletName}
                mode={"outlined"}
                value={walletName}
                placeholder={"your wallet name"}
                right={walletName.length > 0 ? <TextInput.Icon icon={"check"} size={12} iconColor={colors.primary} />
                    : <></>}
            />
            <Text style={{ ...styles.text, color: theme.colors.onPrimary, marginTop: 10 }}>本名や個人を特定できるような名前はトラブルに繋がります。
                避けてください。記号の使用はできません。</Text>

            <FBox style={{ marginTop: 50 }}>
                <Image source={require("../../../assets/icons/bag.svg")} style={{ width: 100, height: 100 }} />
            </FBox>
        </FBox>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    navText: {
        justifyContent: 'center',
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
    },
    text: {
        textAlign: 'center'
    }
});