import { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import UserProfileHeader from '../../components/profile/header';
import UserMedicineSchedule from '../../components/profile/medicine-shedule';
import UserProfileTabs from '../../components/profile/tab';
import { colors, RootParamList } from '../../utils/settings';
import { IconButton } from 'react-native-paper';
import { DownloadShare } from '../../components/globals/download-share';
import { FBox } from '../../components/globals/fbox';

export default function UserProfile({ navigation }) {

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => (
        <IconButton icon={"close"} iconColor={colors.white} onPress={handleBackNav} />
      )
    });
  }, []);

  const handleBackNav = () => {
    if (navigation.canGoBack())
      navigation.goBack()
    else
      navigation.replace('dashboard')
  }

  return (
    <FBox style={styles.container}>
      <ScrollView>
        <UserProfileHeader />
        <FBox style={{ ...styles.subContainer }}>
          <UserProfileTabs />
        </FBox>
        <FBox style={{ ...styles.subContainer }}>
          <UserMedicineSchedule />
        </FBox>
        <FBox style={{ ...styles.subContainer, marginTop: 15, marginBottom: 20 }}>
          <DownloadShare />
        </FBox>
      </ScrollView>
    </FBox>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex'
  },
  subContainer: {
    width: '94%',
    margin: 'auto',
    marginTop: 10
  }
});