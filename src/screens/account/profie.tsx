import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import UserProfileHeader from '../../components/profile/header';
import UserMedicineSchedule from '../../components/profile/medicine-shedule';
import UserProfileTabs from '../../components/profile/tab';
import { colors, RootParamList } from '../../utils/settings';
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { IconButton } from 'react-native-paper';
import { DownloadShare } from '../../components/globals/download-share';

export default function UserProfile({navigation}) {
    const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();

    useEffect(() => {
        navigation.setOptions({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav}/>
          )
        });
      }, []);

      const handleBackNav = ()=>{
        if(navigation.canGoBack())
        navigation.goBack()
        else
        navigation.replace('dashboard')
      }    

  return (
    <View style={styles.container}>
        
<UserProfileHeader />
<View style={{...styles.subContainer}}>
<UserProfileTabs />
</View>
<View style={{...styles.subContainer}}>
<UserMedicineSchedule />
    </View>
    <View style={{...styles.subContainer,marginTop:15}}>
<DownloadShare />
    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      display:'flex'
  },
  subContainer:{
    width: '94%',
    margin:'auto',
    marginBottom:0,
    marginTop:10
  }
});