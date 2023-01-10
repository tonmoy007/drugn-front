import {ScrollView} from "react-native";
import {List, useTheme} from "react-native-paper";
import {FBox} from "../globals/fbox";

export interface Store {
    id: string|number;
    title: string;
    selected?: boolean;
    description: string;

}

interface Props {
    list: Store[];
    onLocationSelect: (index:number,store?: Store) => void;
}

export const StoreList = ({list,onLocationSelect}:Props) => {
    const theme = useTheme()
    return <FBox style={{paddingTop: 10, flex: 1, position: "relative"}}>
        <ScrollView style={{maxHeight: "100%"}}>
            <List.Section>
                {list.map((item, index) => {
                    return <List.Item
                        key={`data_${item.id}`}
                        style={{
                            paddingTop: 5,
                            paddingHorizontal: 10,
                            paddingBottom: 10,
                            borderWidth: 1,
                            borderColor: !item.selected ? theme.colors.outline : theme.colors.primary,
                            borderRadius: 5,
                            marginBottom: 10
                        }}
                        titleStyle={{color: theme.colors.primary}}
                        onPress={() => onLocationSelect(index,item)}
                        title={item.title}
                        description={item.description}
                        descriptionStyle={{
                            color: theme.colors.onPrimary,
                            fontSize: 13,
                            fontWeight: "500",
                            lineHeight: 20
                        }}
                        left={props => <List.Image style={{
                            borderRadius: 10,
                            shadowColor: "rgba(0, 0, 0)",
                            shadowOffset: {width: 4, height: 4},
                            shadowOpacity: .25,
                            shadowRadius: 4,
                            marginTop: 6,
                            backgroundColor: theme.colors.onSecondary
                        }}
                                                   source={require("../../../assets/images/Drugn_logo_white.png")}/>}/>
                })}
            </List.Section>
        </ScrollView>
    </FBox>
}