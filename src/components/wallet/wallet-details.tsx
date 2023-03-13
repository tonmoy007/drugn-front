import {StyleSheet, Image, View, Platform} from 'react-native';
import {useTheme, Text, Button} from 'react-native-paper';
import {FBox} from '../globals/fbox';
import {useEffect, useRef, useState} from 'react'
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {copyToClipboard} from '../../utils/clipboard';
import {updateUser} from '../../utils/store/user';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalState} from '../../utils/store/global';
import domtoimage from 'dom-to-image';
import {ScreenWidth} from "../../utils/constants";
import {HandMoving} from "../globals/hand-moving";

interface Props {
    userWallet: { address: string, privateKey: string, base64Qr: any },
    setCompleted: (val: boolean) => void
    setStep: (val: number) => void
    navigation
}

export default function WalletDetails(props: Props) {
    const [copied, setCopied] = useState<boolean>(false);
    const screenShotRef = useRef(null);
    const [showStep, updateShowStep] = useState(0);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const user = useSelector((state: GlobalState) => state.user)
    const dispatch = useDispatch();
    const QRIMG = props.userWallet.base64Qr;
    const walletAddress = props.userWallet.address ?? "DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD";
    const privateKey = props.userWallet.privateKey ?? "DDAAAAAAAAAAAAAAAADDDDDDDDDDDDDDAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    const theme = useTheme();

    useEffect(() => {
        dispatch(updateUser({...user, wallet: props.userWallet.address}))
    }, [])

    useEffect(() => {
        props.navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => {
                return (
                    <TouchableOpacity
                        style={styles.navText} onPress={() => props.setStep(1)}><MaterialIcons
                        name='keyboard-arrow-left' size={28} color={theme.colors.onPrimary}/></TouchableOpacity>
                )
            },
            headerRight: () => {
                return (
                    <Text style={{
                        ...styles.navText,
                        color: copied && showStep === 3 ? theme.colors.primary : theme.colors.onSurfaceDisabled
                    }}
                          onPress={() => {
                              if (showStep === 3)
                                  props.setCompleted(true)
                          }}>完了</Text>
                )
            }
        });
    }, [props.setCompleted, copied, showStep]);
    const saveScreenShot = async () => {
        if (Platform.OS === "web") {
            domtoimage
                .toJpeg(screenShotRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                })
                .then(dataUrl => {
                    let link = document.createElement('a');
                    link.download = 'sticker-smash.jpeg';
                    link.href = dataUrl;
                    link.click();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
    const onSaveScreenShot = () => {
        if (Platform.OS === "web") {
            saveScreenShot().catch(err => console.log(err));
        }
        updateShowStep(showStep + 1)
    }

    return (
        <FBox style={styles.container}>
            <FBox style={{paddingHorizontal: 20, width: '100%'}}>
                <Text variant={"titleLarge"}
                      style={{fontWeight: '700', marginBottom: 20, textAlign: 'center'}}>まもなくWalletの準備が整います</Text>
                <FBox style={{...styles.warning, borderColor: theme.colors.scrim}}>
                    <Text variant={"titleMedium"} style={{color: theme.colors.scrim, fontWeight: '700'}}><FontAwesome
                        name='warning' size={18}/> 重要 <FontAwesome
                        name='warning' size={18}/></Text>
                    <Text style={{...styles.text, color: theme.colors.scrim, marginTop: 8}}>
                        Walletの受け取りを完了するには
                        本画面のスクリーンショットを取るか、
                        プライベートキーのコピーし、
                        絶対に紛失しない、流出しないように
                        大切に保管してください。</Text>
                </FBox>
            </FBox>
            <View ref={screenShotRef} style={{...styles.container2, backgroundColor: theme.colors.onPrimary}}>
                <Text style={{color: theme.colors.primary, fontWeight: '700',}} variant={"titleMedium"}>アドレス</Text>
                <FBox style={styles.relative}>
                    <Button style={{width: '100%'}}
                            onPress={() => {
                                copyToClipboard({
                                    text: walletAddress,
                                    msg: `Wallet address copied successfully`
                                }).then(() => {
                                    if (showStep === 0) {
                                        updateShowStep(showStep + 1)
                                    }
                                })
                            }}>
                        <Text style={{
                            ...styles.text,
                            flex: 1,
                            flexWrap: 'wrap',
                            color: theme.colors.background,
                            fontWeight: '700',
                        }} variant={"titleMedium"}>{walletAddress}</Text>
                    </Button>
                    {showStep === 0 && <HandMoving/>}
                </FBox>


                <Text style={{color: theme.colors.primary, fontWeight: '700', marginVertical: 20}}
                      variant={"titleMedium"}>保管が必要なプライベートキー</Text>

                <TouchableOpacity
                    onLongPress={() => {
                        copyToClipboard({text: privateKey, msg: `Private key copied successfully`}).then(() => {
                            if (showStep == 1) {
                                updateShowStep(showStep + 1)
                            }
                        })
                    }}>
                    <Image source={{uri: QRIMG}} style={{width: 250, height: 250}}/>
                </TouchableOpacity>

                <FBox style={{width: '100%', padding: 10, marginTop: 20, backgroundColor: theme.colors.backdrop}}>
                    <Text style={{...styles.text, color: theme.colors.background, fontWeight: '700',}}
                          variant={"titleMedium"}>{privateKey}</Text>
                </FBox>
                <FBox style={styles.relative}>
                    <Button style={{...styles.button, backgroundColor: theme.colors.primary}}
                            onPress={async () => {
                                setCopied(await copyToClipboard(
                                    {text: privateKey, msg: `Private key copied successfully`, time: 1000}))
                                updateShowStep(showStep + 1)
                            }}
                            labelStyle={{...styles.text, color: theme.colors.onPrimary}}>プライベートキーをコピーする</Button>

                    {showStep === 1 ? <HandMoving/> : null}
                </FBox>
                <Text style={{color: theme.colors.background, fontWeight: '700', marginVertical: 10}}
                      variant={"titleMedium"}>又は</Text>
                <FBox style={styles.relative}>
                    <Button onPress={() => onSaveScreenShot()}
                            style={{...styles.button, backgroundColor: theme.colors.primary}}
                            labelStyle={{...styles.text, color: theme.colors.onPrimary}}
                    >本画面をスクリーンショットで保管する</Button>
                    {showStep === 2 ? <HandMoving/> : null}
                </FBox>

                <FBox style={{width: '100%', paddingBottom: 30, maxWidth: ScreenWidth}}>
                    <Button icon={"help-circle-outline"} mode={"outlined"}
                            style={styles.help}
                            labelStyle={{...styles.helpText, color: theme.colors.background}}
                            onPress={() => {
                            }}>プライベートキーとは?
                    </Button>
                    <Button icon={"help-circle-outline"} mode={"outlined"}
                            style={styles.help} labelStyle={{...styles.helpText, color: theme.colors.background}}
                            onPress={() => {
                            }}>プライベートキーを無くしたらどうなりますか?</Button>
                </FBox>
            </View>
        </FBox>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: ScreenWidth,
        overflow: "hidden"
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
        marginHorizontal: 0,
        maxWidth: ScreenWidth,
        overflow: "hidden"
    },
    relative: {position: "relative", width: "100%", alignItems: "center"}
});