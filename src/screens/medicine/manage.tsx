import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {  IconButton } from 'react-native-paper';
import { DoseList } from '../../components/medicine/dose-list';
import { colors, RootParamList } from '../../utils/settings';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { MedicineSlider } from '../../components/medicine/medicine-slider';

export default function ManageMedicine({route, navigation}) {
  const [list, updateList] = useState([...Array(1).keys()].map((item,index) => {
    return {
        title: <Text>{index+1} ダイアモックス錠250mg</Text>,
        description: <View><Text>三和科学研究</Text><Text style={{marginTop:10}}>朝食前/2錠</Text></View>,
        id: item,
        selected: false,
    }
}))
const { medicine = {1:{}}} = route.params ?? { }
const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => {},
      headerRight: () => {
        return (
          <Text style={styles.text}>次</Text>
        )
    }
    });
  }, [medicine]);

  const onLocationSelect = (index) => {
    // const l = list.map(data => {
    //     return {...data, selected: false}
    // })
    // l[index].selected = true
    // updateList(l)
    // setValue(l[index])
}

  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
     <Image  source={{ uri: medicine[1].uri }} style={styles.image} />
     </View>
      
      <View style={{flex:2}}>
        <View style={{ marginLeft:10, marginRight:10, flex:2}}>
      <DoseList list={list} onLocationSelect={onLocationSelect}/> 
       <View style={styles.reshoot}>
        <Text style={{color:colors.primary, fontSize:20}} onPress={()=>nav.navigate("addMedicine")}>
          <IconButton style={styles.icon} icon={"camera"} iconColor={colors.primary} size={20}/> 撮り直し</Text>
        </View>
      </View>

      <View style={{flex:1, justifyContent:'flex-end'}}>
        <View style={styles.slider}>
    <MedicineSlider />
        </View>
        </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
  },
  imageContainer:{
    display:'flex',
    alignItems:'center',
    marginLeft:10,
      marginRight: 10
},
reshoot:{
  display:'flex', 
  justifyContent:'center',
  alignItems:'center',
   marginBottom:40
},
  image: {
height: 300,
width: '100%'
  },
  icon:{
width: 'inherit',
height: 'inherit',
margin:0
  },
  text: {
    justifyContent:'center',
    fontSize: 20,
    textAlign:'center',
    margin:10,
    display:'flex',
    flex:1,
    alignItems: 'center',
    color:colors.primary
},
slider:{
  display:'flex', 
  height:200, 
  paddingTop:20, 
  justifyContent:'center', 
  alignItems:'center', 
  backgroundColor:colors.background2
}
});