import { Camera, CameraType } from '../../../../external/expo-camera';
import { useEffect, useRef, useState } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Button, IconButton, Text, useTheme } from "react-native-paper";
import { colors, RootParamList } from '../../../utils/settings';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StepOf } from '../../../components/globals/step-of';
import { FBox } from '../../../components/globals/fbox';
import { DoseList } from '../../../components/medicine/dose-list';
import { useEditMedMutation } from '../../../api/okusuri';
import { toastMessage } from '../../../utils/toast';

export default function RecordMedicine({ route, navigation }) {
    let cameraRef = useRef<any>()
    const [medData, setMedData] = useState<any>({})
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [editMed, { isLoading }] = useEditMedMutation()
    const [medicine, setMedicine] = useState<any>({});
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
    const theme = useTheme();


    useEffect(() => {
        let curStep = 1;
        if (medicine[1] && medicine[2])
            curStep = 3;
        else
            curStep = medicine[1] ? 2 : 1;
        navigation.setOptions({
            headerTitleAlign: 'center',
            headerLeft: () => (
                <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav} />
            ),
            headerRight: () => {
                return (
                    curStep === 3 ?
                        isLoading ?
                            <ActivityIndicator size={'small'} color={colors.white} />
                            :
                            <Text style={[styles.text, { color: colors.primary }]}
                                onPress={() => updateMed()}>次へ</Text>
                        :
                        <StepOf total={3} current={curStep} />
                )
            }
        });
    }, [medicine]);
    useEffect(() => {
        if (!permission?.granted) {
            requestPermission().catch(err => alert(err))
        }
        if (route.params?.medData) {
            setMedData(route.params.medData)
        }
    }, [])

    const handleBackNav = () => {
        if (navigation.canGoBack())
            navigation.goBack()
        else
            navigation.replace('dashboard')
    }

    const updateMed = async () => {
        const tempMedData = {
            userId: medData.user_id,
            id: medData.id,
            medicineName: medData.medicine_name,
            medicineId: medData.id,
            takeMedicineIconType: medData.medicine_icon_type,
            takeMedicineTimeType: medData.take_medicine_time_type,
            dose: medData.dose
        }
        editMed({ ...tempMedData }).unwrap().then(async (res) => {
            if (res.error) {
                toastMessage({ msg: res.message });
                return;
            }
            toastMessage({ msg: `薬が正常に記録されました` })
            nav.navigate('dashboard')
        }).catch(err => {
            toastMessage({ msg: err.message ?? "Server Error Response" })
        })
    }

    const takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        let newMedicine = await cameraRef.current.takePictureAsync(options);
        setMedicine({ ...medicine, [medicine[1] ? 2 : 1]: newMedicine });
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
            {medicine[1] && medicine[2] ?
                <>
                    {Array.from({ length: 2 }).map((_, index) =>
                        <ImageBackground source={{ uri: medicine[index + 1].uri }} style={styles.camera}
                            key={`photo${index + 1}`}>
                            {!isLoading && <Button icon={"camera"} labelStyle={[styles.text, { fontSize: 16 }]} mode={"outlined"}
                                style={styles.photoPreview}
                                onPress={() => setMedicine({ ...medicine, [index + 1]: null })}>{index
                                    ? '服用した後の写真を撮ります' : '服用する前の写真を撮ります'} (撮り直し)
                            </Button>}
                        </ImageBackground>
                    )}
                    <FBox style={{ flex: 1 }}>
                        <Text style={styles.text}>服用するお薬を撮影してください。
                            ※お薬飲み忘れで時間が異なる場合も同様に撮影ください。</Text>
                    </FBox>
                    {isLoading && <FBox>
                        <ActivityIndicator size={'large'} color={colors.primary} />
                        <Text style={{ fontStyle: 'italic', textAlign: 'center' }}> Recording Medicine...</Text>
                    </FBox>}
                </>
                :
                <>
                    <Camera style={styles.camera} type={CameraType.back} ref={cameraRef} />
                    <FBox style={styles.photoType}>
                        {!medicine[1] ?
                            <Text style={styles.cameraText}>服用する前の写真を撮ります</Text>
                            :
                            <Text style={styles.cameraText}>服用した後の写真を撮ります</Text>
                        }
                    </FBox>
                    <FBox>
                        <DoseList list={[medData]} swipeable={false} recordMed={true} />
                    </FBox>
                    <FBox style={{ flex: 2 }}>
                        <Text style={styles.text}>服用するお薬を撮影してください。</Text>
                        <FBox style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.circle} onPress={takePic}>
                                <IconButton icon={"camera"} iconColor={colors.black} size={35} />
                            </TouchableOpacity>
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