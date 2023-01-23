import {ScrollView, View,Text,Image,StyleSheet} from "react-native";
import {Divider, IconButton, List, useTheme} from "react-native-paper";
import { colors } from "../../utils/settings";
import {FBox} from "../globals/fbox";

export interface Medicine {
    id: string|number;
    title: any;
    selected?: boolean;
    description: any;
}

interface Props {
    list: Medicine[];
    onLocationSelect: (index:number,store?: Medicine) => void;
}

export const DoseList = ({list,onLocationSelect}:Props) => {
    const theme = useTheme()
    return <FBox style={{paddingTop: 10, flex: 1, position: "relative"}}>
        <ScrollView style={{maxHeight: "100%"}}>   
         <List.Section>
                {list.map((item, index) => {
                    return <View key={`view_${item.id}`}><List.Item
                        key={`data_${item.id}`}
                        style={styles.list}
                        onPress={() => onLocationSelect(index,item)}
                        title={item.title}
                        titleStyle={{ opacity: !item.selected ? 1 : 0.6,}}
                        description={item.description}
                        descriptionStyle={[styles.desc,{
                            color: theme.colors.onPrimary,
                            opacity: !item.selected ? 1 : 0.6,
                        }]}
                        left={props => <Image style={[styles.listImage,{
                            opacity: !item.selected ? 1 : 0.6,
                            backgroundColor: theme.colors.onSecondary
                        }]}
                        source={require("../../../assets/images/Drugn_logo_white.png")} />
                    }
                        right={props => item.selected?<View style={{alignItems:'center', justifyContent:'center'}}>
                            <IconButton icon={"trash-can"} onPress={()=>{}} iconColor={colors.red}
                            style={{width:'inherit', height:'inherit', margin:0}}/>
                        <Text style={{color:colors.red}}>消去</Text></View>
                        :
                    null}
                        />


            {index<list.length-1 && <Divider key={`divider_${item.id}`} style={{borderColor:colors.textDark}}/>} 
                                                   </View>
                })}  
                </List.Section>
                  </ScrollView>
    </FBox>
}

const styles = StyleSheet.create({
    list:{
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    desc:{
        fontSize: 13,
        fontWeight: "500",
        lineHeight: 20
    },
    listImage:{
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0)",
        shadowOffset: {width: 4, height: 4},
        shadowOpacity: .25,
        shadowRadius: 4,
        marginTop: 6,
        width:80,
        height:80
    }
})