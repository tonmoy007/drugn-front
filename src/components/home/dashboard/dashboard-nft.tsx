import {FBox} from "../../globals/fbox";
import {Button, Card, Divider, List, Text, useTheme} from "react-native-paper";
import {colors} from "../../../utils/settings";
import {CustomIcon} from "../../../utils/custom-icon";
import {Dimensions, TouchableOpacity} from "react-native";
import {useState} from "react";

export const DashboardNft = () => {
    const theme = useTheme()
    const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
    const [open, setOpen] = useState(false)
    return (
        <FBox style={{
            backgroundColor: theme.colors.background,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            zIndex: 10,
            padding: 18,
            position: open ? "absolute" : "relative",
            width: "100%",
            height: open ? "100%" : "auto",
            top: open ? 80 : 0,

        }}>
            <TouchableOpacity style={{
                backgroundColor: "#293658",
                width: 40,
                height: 5,
                borderRadius: 20,
                position: "absolute",
                left: "40%",
                top: 10
            }} onPress={() => setOpen(!open)}/>
            <Text style={{fontFamily: "Montserrat_700Bold", paddingBottom: 20}}>NFT</Text>
            <Card theme={{elevation:1}} style={{
                backgroundColor: colors.navBackground,
                borderRadius: 20,marginBottom:0}}>
                <Card.Content>
                    <FBox style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        position:'relative'
                    }}>
                        <FBox style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
                            <CustomIcon color={colors.white} name={"nft-up"} size={windowHeight<700?20:40}/>
                            <Text style={{fontFamily: "Montserrat_700Bold", marginTop: 10,fontSize:10}}>NFT売買</Text>
                        </FBox>
                        <FBox style={{width: 1, backgroundColor: colors.white, height:100}}></FBox>
                        <FBox style={{flex: 1, alignItems: "center", flexDirection: "column"}}>
                            <CustomIcon color={colors.white} name={"nft-down"}  size={windowHeight<700?20:40}/>
                            <Text style={{fontFamily: "Montserrat_700Bold", marginTop: 10,fontSize:10}}>NFT受取</Text>
                        </FBox>
                    </FBox>
                </Card.Content>
            </Card>
            {open&&(
                <FBox >
                    <Text style={{fontFamily:"Montserrat_700Bold"}} variant={"titleMedium"}>NFT一覧</Text>
                    <FBox>
                        <List.AccordionGroup >
                            <List.Accordion title="Accordion 1" id="1" >
                                <List.Item title="Item 1" />
                            </List.Accordion>
                            <List.Accordion title="Accordion 2" id="2">
                                <List.Item title="Item 2" />
                            </List.Accordion>
                            <FBox>
                                <Text>
                                    List.Accordion can be wrapped because implementation uses React.Context.
                                </Text>
                                <List.Accordion title="Accordion 3" id="3">
                                    <List.Item title="Item 3" />
                                </List.Accordion>
                            </FBox>
                        </List.AccordionGroup>
                    </FBox>
                </FBox>
            )}
        </FBox>
    )
}