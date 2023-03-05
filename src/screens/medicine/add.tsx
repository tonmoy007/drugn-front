import { Camera, CameraType } from '../../../external/expo-camera';
import { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Button, IconButton, Text, useTheme } from "react-native-paper";
import { StepOf } from '../../components/globals/step-of';
import { colors, RootParamList } from '../../utils/settings';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FBox } from '../../components/globals/fbox';
import { useGs1codeMutation } from '../../api/okusuri';
import { toastMessage } from '../../utils/toast';

export default function AddMedicine({ route, navigation }) {
    let cameraRef = useRef<any>()
    const [medData, setMedData] = useState<object>({})
    const [gs1code, { isLoading }] = useGs1codeMutation()
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [medicine, setMedicine] = useState<any>(null);
    const [scannedGS1Code, setScannedGS1Code] = useState<string>('');
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const theme = useTheme();
    const { allMeds = {} } = route.params ?? {}


    useEffect(() => {
        if (route)
            setMedicine(null)
    }, [route])

    useEffect(() => {
        let curStep = 1;
        if (medicine)
            curStep = 2;
        else
            curStep = 1;
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav} />
            ),
            headerRight: () => {
                return (
                    curStep === 2 ?
                        <Text style={[styles.text, { color: colors.primary }]}
                            onPress={() => nav.navigate("editMedicine", { medData: medData, allMeds: allMeds })}>次へ</Text>
                        :
                        <StepOf total={2} current={curStep} />
                )
            }
        });
    }, [medicine]);
    useEffect(() => {
        console.log(permission?.granted)
        if (!permission?.granted) {
            requestPermission().catch(err => alert(err))
        }
        console.log(permission)
        console.log("Hello")
    }, [])

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('dashboard')
    }

    const takePic = async (gsCode) => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        if (gsCode) {
            setScannedGS1Code(gsCode)
            const newMedicine = await cameraRef.current.takePictureAsync(options);
            // api call to verify gs1Code
            gs1code({ gs1code: gsCode }).unwrap().then(async (res) => {
                if (res.error) {
                    toastMessage({ msg: res.message });
                    return;
                }
                setMedData(res)
                setMedicine(newMedicine);
            }).catch(err => {
                console.log(err)
                toastMessage({ msg: err.message ?? "Server Error Response" })
            })
        } else {
            let newMedicine = await cameraRef.current.takePictureAsync(options);
            setMedicine(newMedicine);
        }

    };

    if (!permission?.granted) {
        return (
            <FBox style={styles.container}>
                <FBox>
                    <Text style={{ ...styles.text, color: colors.white }}>Permission to use Camera</Text>
                    <Button onPress={() => requestPermission().catch(err => alert(err)).then(res => {
                        if (res?.status === "denied") {
                            alert("Sorry We can not show camera as the permission is denied by the browser ")
                        }
                    })} style={styles.button}>Grant
                        permission</Button>
                </FBox>
            </FBox>
        );
    }

    return (
        <FBox style={styles.container}>
            {medicine ?
                <>
                    <ImageBackground source={{ uri: medicine.uri }} style={styles.camera}
                        key={`medPhoto`}>
                        <Button icon={"camera"} labelStyle={[styles.text, { fontSize: 16 }]} mode={"outlined"}
                            style={styles.photoPreview}
                            onPress={() => setMedicine(null)}>バーコードをスキャン</Button>
                    </ImageBackground>
                    <FBox style={styles.photoType}>
                        <Text style={styles.cameraText}>{scannedGS1Code}</Text>
                        <Text style={{ textAlign: 'center' }}>{medData['CYOUZAI_HOUSOU_UNIT_NAME']}</Text>
                    </FBox>
                    <FBox style={styles.camera}>

                    </FBox>
                </>
                :
                <>
                    {isLoading ?
                        <FBox style={{ ...styles.camera }}>
                            <FBox>
                                <ActivityIndicator size="large" color={theme.colors.primary} />
                                <Text style={{ fontStyle: 'italic', textAlign: 'center' }}> Verifying Barcode...</Text>
                            </FBox>
                        </FBox>
                        :
                        <Camera style={styles.camera} type={CameraType.back} ref={cameraRef} barCodeScannerSettings={{
                            barCodeTypes: [
                                'aztec',
                                'codabar',
                                'code39',
                                'code128',
                                'ean13',
                                'ean8',
                                'datamatrix',
                                'pdf417',
                                'interleaved2of5',
                                'qr',
                                'upc_a',
                                'upc_e',
                                'upc_e_e',
                                'rss14',
                                'maxicode',
                                'rssExpanded'
                            ], interval: 10
                        }} onBarCodeScanned={(res) => {
                            if (res.data) {
                                takePic(res.data)
                            }
                        }} />
                    }
                    <FBox style={{ flex: 2 }}>
                        <Text style={styles.text}>服用中のお薬のバーコードをスキャンしてください。</Text>
                        <FBox style={styles.buttonContainer}>
                            {/* <TouchableOpacity style={styles.circle} onPress={() => takePic(null)}>
                                <IconButton icon={"camera"} iconColor={colors.black} size={35} />
                            </TouchableOpacity> */}
                        </FBox>
                    </FBox>
                </>
            }
        </FBox >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        flexDirection: 'column-reverse',
        paddingBottom: 10
    },
    photoType: {
        display: 'flex',
        alignItems: 'center'
    },
    cameraText: {
        justifyContent: 'center',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 10,
        padding: 2,
        display: 'flex',
        backgroundColor: colors.textDark,
        width: 'max-content'
    },
    photoPreview: {
        alignSelf: 'flex-end',
        fontSize: 16,
        backgroundColor: colors.textDarker,
        borderRadius: 20,
        border: 0,
        padding: 0
    },
    button: {
        backgroundColor: colors.textDark,
        borderRadius: 10,
        width: 'max-content',
        margin: 'auto'
    },
    nextButton: {
        marginRight: 10
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignItems: 'center',
        flex: 1
    },
    circle: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.white,
        border: '5px double',
    },
    text: {
        justifyContent: 'center',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        margin: 10,
        display: 'flex',
        flex: 1,
        alignItems: 'center'
    },
});