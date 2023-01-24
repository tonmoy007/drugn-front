import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../../utils/settings';
import {  Card } from 'react-native-paper';
import { CustomIcon } from '../../utils/custom-icon';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const medSchedule = [
    {
        date:'11/28',
        date2:'(D)',
        breakfast:'10:00',
        lunch:'13:00',
        snack:'',
        dinner:'24:00',
    },
    {
        date:'11/29',
        date2:'(D)',
        breakfast:'10:00',
        lunch:'13:00',
        snack:'',
        dinner:'x',
    },
    {
        date:'11/30',
        date2:'(D)',
        breakfast:'09:40',
        lunch:'',
        snack:'',
        dinner:'',
    },
    {
        date:'12/1',
        date2:'(D)',
        breakfast:'',
        lunch:'',
        snack:'',
        dinner:'',
    },
    {
        date:'11/2',
        date2:'(D)',
        breakfast:'',
        lunch:'',
        snack:'',
        dinner:'',
    },
    {
        date:'11/3',
        date2:'(D)',
        breakfast:'',
        lunch:'',
        snack:'',
        dinner:'',
    },  
    {
        date:'11/4',
        date2:'(D)',
        breakfast:'',
        lunch:'',
        snack:'',
        dinner:'',
    },
]

export default function UserMedicineSchedule() {

  return (
 <Card theme={{elevation: 1}} style={styles.card}>
                    <Card.Content style={{paddingLeft:5, paddingRight:5}}>
                        <View style={styles.header}>
                            <MaterialIcons name='keyboard-arrow-left' style={styles.headerText} size={28}/>
                            <Text style={{...styles.headerText, fontSize:18}}>MEDICINE 1</Text>
                            <MaterialIcons name='keyboard-arrow-right' style={styles.headerText} size={28}/>
                        </View>
                        <View style={styles.tabs}>
                        <View style={{...styles.tabContainer,...styles.tabContainerHeader,marginRight:20, marginLeft:10 }}>
                            </View>
                            <View style={{...styles.tabContainer,...styles.tabContainerHeader, backgroundColor:colors.lightBlue }}>
                            <CustomIcon name='sunrise' size={30} color={colors.white}/>
                            </View>
                            <LinearGradient start={{x:0.5,y:0.5}} colors={[ 'rgb(255, 230, 3)',  'rgb(240, 129, 26)','rgb(191, 83, 31)','rgb(136, 87, 3)']}
        style={{...styles.tabContainer,...styles.tabContainerHeader}}>
            <CustomIcon name='sunrise' size={30} color={colors.white}/>
            </LinearGradient>
                            <View style={{...styles.tabContainer,...styles.tabContainerHeader, backgroundColor:colors.textDarker }}>
                            <CustomIcon name='sunrise' size={30} color={colors.white}/>
                            </View>
                            <LinearGradient start={{x:0.5,y:0.5}} colors={[ 'rgb(86, 74, 255)', 'rgb(101, 54, 255)', 'rgb(144, 0, 176)','rgb(144, 0, 176)', 'rgb(144, 0, 176)']}
        style={{...styles.tabContainer,...styles.tabContainerHeader}}>
                            <CustomIcon name='sunrise' size={30} color={colors.white}/>
                            </LinearGradient>
            
                        </View>
                        {medSchedule.map((schedule,index)=>
                        <>
                        <View style={styles.tabs}>

                            <View style={{...styles.tabContainer,...styles.tabDate}}>
                                <Text style={styles.tabText}>{schedule.date}</Text>
                                <Text style={styles.tabText}>{schedule.date2}</Text>
                            </View>
                            <View style={{...styles.tabContainer,...styles.tabContainerBody,
                            borderBottomRightRadius:index===medSchedule.length-1?10:0, borderBottomLeftRadius:index===medSchedule.length-1?10:0}}>
                                <Text style={styles.tabText}>{schedule.breakfast}</Text>
                            </View>
                            <View style={{...styles.tabContainer,...styles.tabContainerBody,
                            borderBottomRightRadius:index===medSchedule.length-1?10:0, borderBottomLeftRadius:index===medSchedule.length-1?10:0}}>
                                <Text style={styles.tabText}>{schedule.lunch}</Text>
                            </View>
                            <View style={{...styles.tabContainer,...styles.tabContainerBody, backgroundColor:colors.textDarker,
                            borderBottomRightRadius:index===medSchedule.length-1?10:0, borderBottomLeftRadius:index===medSchedule.length-1?10:0}}>
                                <Text style={styles.tabText}>{schedule.snack}</Text>
                            </View>
                            <View style={{...styles.tabContainer,...styles.tabContainerBody,
                            borderBottomRightRadius:index===medSchedule.length-1?10:0, borderBottomLeftRadius:index===medSchedule.length-1?10:0,
                            backgroundColor: schedule.dinner === 'x'?colors.textInputIconBackground:colors.black
                            }}>
                                <Text style={styles.tabText}>{schedule.dinner}</Text>
                            </View>

                        </View>
                        </>
                        )}
                        <Text style={styles.footer}>撮り直し</Text>
                    </Card.Content>
                </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:colors.background2,
    width:'100%',
    maxWidth:400,
    margin:'auto'
},
  header:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10,
    marginRight:10
},
  headerText:{
    fontWeight:'500',
    color:colors.white,
    marginBottom:20
},
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    display:'flex',
},
  tabContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    marginRight:5,
    justifyContent:'center',
    },
  tabContainerHeader:{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    height:45
    },
  tabDate:{
    height:40,
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginRight:20,
    marginLeft:10
           },
  tabContainerBody:{
    height:40,
    backgroundColor:colors.black,
            },
 tabText: {
    marginTop: 2,
    fontSize: 16,
    color:colors.white,
},
 footer:{
    textAlign:'center',
    marginTop:10,
    fontSize: 20,
    color: colors.lightBlue
}
});