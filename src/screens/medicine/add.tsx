import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import {Button} from "react-native-paper";
import {  IconButton } from 'react-native-paper';
import { StepOf } from '../../components/globals/step-of';
import { colors, RootParamList } from '../../utils/settings';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export default function AddMedicine({route, navigation}) {
  let cameraRef = useRef<any>()
  const [type, setType] = useState<any>(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [medicine, setMedicine] = useState<any>({});
  const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useEffect(() => {
    let curStep = 1;
    if(medicine[1] && medicine[2])
    curStep = 3;
    else
    curStep = medicine[1]?2:1;
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => (
        <IconButton icon={"close"} iconColor={colors.white} onPress={() => navigation.goBack(null)}/>
      ),
      headerRight: () => {
        return (
          curStep===3?
          <Text style={[styles.text,{color:colors.primary}]} onPress={()=>nav.navigate("manageMedicine",{
            medicine: medicine,
          })}>次</Text>
          :  
          <StepOf total={3} current={curStep}/>
        )
    }
    });
  }, [medicine]);

let takePic = async () => {
  let options = {
    quality: 1,
    base64: true,
    exif: false
  };

  let newMedicine = await cameraRef.current.takePictureAsync(options);
  setMedicine({...medicine, [medicine[1]?2:1]:newMedicine});
};

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} >Grant permission</Button>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      {medicine[1] && medicine[2]?
      <>
      {Array.from({ length: 2 }).map((_, index) =>
<ImageBackground  source={{ uri: medicine[index+1].uri }} style={styles.camera} key={`photo${index+1}`}>
            <Button icon={"camera"} labelStyle={[styles.text,{fontSize:16}]} mode={"outlined"} 
            style={styles.photoPreview}
                    onPress={() => setMedicine({...medicine, [index+1]:null})}>
撮り直し {index?'バック':'フロント'}
            </Button>
        </ImageBackground >
      )}
      <View style={{flex:1}}>
        <Text style={styles.text}>服用するお薬を撮影してください。
※お薬飲み忘れで時間が異なる場合も同様に撮影ください。</Text>
      <View style={[styles.buttonContainer, {flexDirection:'row-reverse', justifyContent:'space-between', marginRight:10}]}>
      <Button icon={"arrow-right"} labelStyle={styles.text} mode={"contained"} style={[styles.button, styles.nextButton]}
                   onPress={()=>nav.navigate("manageMedicine",{
                    medicine: medicine,
                  })}>
              次
            </Button>
        </View>
        </View>
      </>
    :
    <>
      <Camera style={styles.camera} type={type} ref={cameraRef} />
     <View style={styles.photoType}>
     {!medicine[1]?
     <Text style={styles.cameraText}>フロント</Text>
     :
     <Text style={styles.cameraText}>バック</Text>
     }
     </View>
      <View style={{flex:2}}>
        <Text style={styles.text}>服用するお薬を撮影してください。
※お薬飲み忘れで時間が異なる場合も同様に撮影ください。</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.circle} onPress={takePic}>
          <IconButton icon={"camera"} iconColor={colors.black} size={35}/>
          </TouchableOpacity>
        </View>
        </View>
      </> 
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  camera: {
      flex: 1,
      flexDirection:'column-reverse',
      paddingBottom:10
  },
  photoType:{
      display:'flex',
      alignItems:'center'
  },
  cameraText: {
      justifyContent:'center',
      fontSize: 20,
      color: 'white',
      textAlign:'center',
      margin:10,
      padding:2,
      display:'flex',
      backgroundColor:colors.textDark,
      width:'max-content'
      },
  photoPreview:{
      alignSelf:'flex-end',
      fontSize:16,
      backgroundColor:colors.textDarker,
      borderRadius:20,
      border:0,
      padding:0
      },
  button: {
      backgroundColor: colors.textDark,
      borderColor: colors.white,
      borderRadius: 10,
      width: 'max-content',
      margin:'auto'
},
  nextButton: {
      backgroundColor: colors.primary,
      marginRight: 10
},
  buttonContainer: {
      justifyContent:'center',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      alignItems:'center',
      flex:1
  },
  circle: {
      alignItems: 'center',
      justifyContent:'center',
      display: 'flex',
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.white,
      border: '5px double',
  },
  text: {
      justifyContent:'center',
      fontSize: 20,
      color: 'white',
      textAlign:'center',
      margin:10,
      display:'flex',
      flex:1,
      alignItems: 'center'
  },
});