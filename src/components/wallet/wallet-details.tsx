import { StyleSheet, Dimensions } from 'react-native';
import { useTheme, Text, Button, Card, Divider } from 'react-native-paper';
import { FBox } from '../globals/fbox';
import { useEffect, useState } from 'react'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { copyToClipboard } from '../../utils/clipboard';
import QRCode from 'react-native-qrcode-svg';

interface Props {
    setCompleted: (val: boolean) => void
    setStep: (val: number) => void
    navigation
}

export default function WalletDetails(props: Props) {
    const [copied, setCopied] = useState<boolean>(false)
    const walletAddress = 'N12QWEI12138OIH0DOIHQ21IFOUSHFW3HDAKJ'
    const privateKey = '8192841209710QHDQ213010HEWQHE12H112EJMPOEJQWOWJEPOQJW1'
    const theme = useTheme()

    useEffect(() => {
        props.navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        style={styles.navText} onPress={() => props.setStep(1)}><MaterialIcons
                            name='keyboard-arrow-left' size={28} color={theme.colors.onPrimary} /></TouchableOpacity>
                )
            },
            headerRight: () => {
                return (
                    <Text style={{ ...styles.navText, color: copied ? theme.colors.primary : theme.colors.onSurfaceDisabled }}
                        onPress={() => {
                            if (copied)
                                props.setCompleted(true)
                        }}>完了</Text >
                )
            }
        });
    }, [props.setCompleted, copied]);

    return (
        <FBox style={styles.container}>
            <FBox style={{ paddingHorizontal: 20, width: '100%' }}>
                <Text variant={"titleLarge"} style={{ fontWeight: '700', marginBottom: 20, textAlign: 'center' }}>まもなくWalletの準備が整います</Text>
                <FBox style={{ ...styles.warning, borderColor: theme.colors.scrim }}>
                    <Text variant={"titleMedium"} style={{ color: theme.colors.scrim, fontWeight: '700' }}><FontAwesome name='warning' size={18} /> 重要 <FontAwesome
                        name='warning' size={18} /></Text>
                    <Text style={{ ...styles.text, color: theme.colors.scrim, marginTop: 8 }}>Walletの受け取りを完了するには
                        本画面のスクリーンショットを取るか、
                        プライベートキーのコピーし、
                        絶対に紛失しない、流出しないように
                        大切に保管してください。</Text>
                </FBox>
            </FBox>

            <FBox style={{ ...styles.container2, backgroundColor: theme.colors.onPrimary }}>
                <Text style={{ color: theme.colors.primary, fontWeight: '700', }} variant={"titleMedium"}>アドレス</Text>
                <Button style={{ width: '100%' }}
                    onPress={() => copyToClipboard({ text: walletAddress, msg: `Wallet address copied successfully` })}>
                    <Text style={{ ...styles.text, flex: 1, flexWrap: 'wrap', color: theme.colors.background, fontWeight: '700', }} variant={"titleMedium"}>{walletAddress}</Text>
                </Button>

                <Text style={{ color: theme.colors.primary, fontWeight: '700', marginVertical: 20 }} variant={"titleMedium"}>保管が必要なプライベートキー</Text>
                <TouchableOpacity
                    onLongPress={() => copyToClipboard({ text: walletAddress, msg: `Wallet address copied successfully` })}>
                    <QRCode
                        value={walletAddress}
                        logo={require('../../../assets/icon.png')}
                        logoSize={50}
                        size={250}
                    />
                </TouchableOpacity>

                <FBox style={{ width: '100%', padding: 10, marginTop: 20, backgroundColor: theme.colors.backdrop }}>
                    <Text style={{ ...styles.text, color: theme.colors.background, fontWeight: '700', }} variant={"titleMedium"}>{privateKey}</Text>
                </FBox>
                <Button style={{ ...styles.button, backgroundColor: theme.colors.primary }}
                    onPress={async () => setCopied(await copyToClipboard(
                        { text: privateKey, msg: `Private key copied successfully`, time: 1000 }))}
                    labelStyle={{ ...styles.text, color: theme.colors.onPrimary }}>プライベートキーをコピーする</Button>
                <Text style={{ color: theme.colors.background, fontWeight: '700', marginVertical: 10 }}
                    variant={"titleMedium"}>又は</Text>
                <Button style={{ ...styles.button, backgroundColor: theme.colors.primary }}
                    labelStyle={{ ...styles.text, color: theme.colors.onPrimary }}>本画面をスクリーンショットで保管する</Button>

                <FBox style={{ width: '100%', paddingBottom: 30 }}>
                    <Button icon={"help-circle-outline"} mode={"outlined"}
                        style={styles.help} labelStyle={{ ...styles.helpText, color: theme.colors.background }} onPress={() => { }}>プライベートキーとは?
                    </Button>
                    <Button icon={"help-circle-outline"} mode={"outlined"}
                        style={styles.help} labelStyle={{ ...styles.helpText, color: theme.colors.background }} onPress={() => { }}>プライベートキーを無くしたらどうなりますか?</Button>
                </FBox>

            </FBox>


        </FBox>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
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
    warning: {
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    container2: {
        marginTop: 50,
        paddingHorizontal: 20,
        paddingTop: 30,
        width: '100%',
        flex: 1,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
        marginBottom: 10,
    },
    helpText: {
        marginHorizontal: 0
    }
});