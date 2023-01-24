import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../../utils/settings';
import {  Card } from 'react-native-paper';
import { CustomIcon } from '../../utils/custom-icon';

export default function UserProfileTabs() {
    
  return (
 <Card theme={{elevation: 1}} style={styles.card}>
                    <Card.Content>
                        <View style={styles.tabs}>
                            <View style={styles.tabContainer}>
                            <View style={styles.tabLabel}>
                                <Text style={styles.tabLabelText}>
                                    <CustomIcon name="pill" /> Coins
                                </Text>
                                </View>
                                <Text style={styles.tabText}>+8.8</Text>
                            </View>
                            <View style={styles.cardDivider}></View>
                            <View style={styles.tabContainer}>
                            <View style={styles.tabLabel}>
                                <Text style={styles.tabLabelText}>
                                    <CustomIcon name="pill" /> Stamina
                                </Text>
                                </View>
                                <Text style={styles.tabText}>-2.4<Text style={{fontSize:16}}>Hp</Text></Text>
                            </View>
                            <View style={styles.cardDivider}></View>
                            <View style={styles.tabContainer}>
                            <View style={styles.tabLabel}>
                                <Text style={styles.tabLabelText}>
                                    <CustomIcon name="pill" /> Items
                                </Text>
                                </View>
                                <Text style={styles.tabText}>+1</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'inherit',
},
tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
},
tabLabel:{
    flex:1, 
    flexDirection:'row'
},
tabContainer: {
    flex: 1,
     alignItems: "center",
      flexDirection: "column"
    },
cardDivider: {
    width: 1,
     backgroundColor: colors.textDark,
     opacity:0.7,
      height: 80
    },
tabLabelText: {
    fontSize: 16,
    opacity: 0.9,
    color:colors.white,
    margin:'0px',
},
tabText: {
    marginTop: 2,
    fontSize: 20,
    color:colors.white,
}
});