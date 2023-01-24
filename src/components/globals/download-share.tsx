import {View, StyleSheet} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { colors } from "../../utils/settings";

export const DownloadShare = () => {
    return (
        <>
           <View style={styles.container}>
            <View style={styles.container}>
            <View style={styles.icon}>
             <IconButton icon={'share-circle'} size={30} iconColor={colors.white}/>   
            </View>

            <View style={styles.icon}>
             <IconButton icon={'cloud-download'} size={30} iconColor={colors.white}/>   
            </View>
    
            </View>
            <Button icon={"help"} labelStyle={[styles.text,{fontSize:16}]} mode={"outlined"} 
            style={styles.photoPreview} onPress={() => {}}>撮り直し 撮り直し
            </Button>
           </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    icon:{
        borderRadius:20,
        width:40,
        height:40,
        backgroundColor:colors.background2,
        justifyContent:'center',
        alignItems:'center',
        marginRight:15
    },
    photoPreview:{
    alignSelf:'flex-end',
      fontSize:16,
      backgroundColor:colors.background2,
      borderRadius:20,
      border:0,
      padding:0
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
    } 
});