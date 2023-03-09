import { useEffect, useState } from 'react';
import { StyleSheet, Image, Modal } from 'react-native';
import { Divider, IconButton, useTheme, Text } from 'react-native-paper';
import { colors, RootParamList } from '../../utils/settings';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MedicineSlider } from '../../components/medicine/medicine-slider';
import { FBox } from '../../components/globals/fbox';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ManageMedicine({ route, navigation }) {
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [list, setList] = useState([...Array(1).keys()].map((item, index) => {
    return {
      title: <Text>{index + 1} ダイアモックス錠250mg</Text>,
      description: <FBox><Text>三和科学研究</Text><Text style={{ marginTop: 10 }}>朝食前/2錠</Text></FBox>,
      id: item,
      selected: false,
    }
  }))
  const { medicine = {} } = route.params ?? {}
  const nav = useNavigation<NativeStackNavigationProp<RootParamList>>();
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerLeft: () => { },
      headerRight: () => {
        return (
          <Text onPress={() => nav.navigate("recordMedicine")} style={{
            ...styles.text, color: theme.colors.primary
          }}> 次へ</Text >
        )
      }
    });
  }, [medicine]);


  return (
    <FBox style={styles.container}>
      <FBox style={styles.imageContainer}>
        <Image source={{ uri: medicine.uri }} style={styles.image} />
      </FBox>

      <FBox style={{ flex: 2 }}>
        <FBox style={{ marginRight: 10, flex: 2 }}>
          {/* <DoseList list={list} /> */}
          <FBox style={{ marginLeft: 10 }}>

            <FBox style={styles.reshoot}>
              <Text style={{ color: theme.colors.primary, fontSize: 20 }} onPress={() => nav.navigate("addMedicine")}>
                <IconButton style={styles.icon} icon={"camera"} iconColor={theme.colors.primary} size={20} /> 写真を撮る</Text>
            </FBox>
          </FBox>
        </FBox>

        <FBox style={{ flex: 1, justifyContent: 'flex-end' }}>
          <FBox style={styles.slider}>
            <MedicineSlider />
          </FBox>
        </FBox>
      </FBox>

      <Modal
        animationType="slide"
        visible={errorModal}
        transparent={true}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <FBox style={styles.modalContainer}>
          <FBox style={{ ...styles.modalContent, backgroundColor: theme.colors.onPrimary }}>
            <Text style={{ ...styles.text, color: theme.colors.onSecondary }}>登録したお薬の中にありません。</Text>
            <Divider style={{ width: '100%', backgroundColor: theme.colors.backdrop }} />
            <Text style={{ ...styles.text, color: theme.colors.onSecondary }}>1 ダイアモックス錠250mg{"\n"}三和科学研究{"\n"}朝食前/2錠</Text>
            <Text style={{ ...styles.text, color: theme.colors.errorContainer }}>SOMETHING</Text>
            <LinearGradient colors={['#F54E5E', '#E83F94']} style={styles.modalButton}>
              <TouchableOpacity style={{ ...styles.modalButton, padding: 10 }} onPress={() => setErrorModal(false)}>
                <Text style={{ color: theme.colors.onPrimary, textAlign: 'center' }}>Close</Text>
              </TouchableOpacity>
            </LinearGradient>
          </FBox>
        </FBox>
      </Modal>

    </FBox>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  reshoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  image: {
    height: 300,
    width: '100%'
  },
  icon: {
    width: 'inherit',
    height: 'inherit',
    margin: 0
  },
  text: {
    justifyContent: 'center',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  slider: {
    display: 'flex',
    height: 150,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background2
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.textDarker,
  },
  modalContent: {
    margin: 40,
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalButton: {
    borderRadius: 5,
    borderWidth: 0,
    width: '100%',
  }
});