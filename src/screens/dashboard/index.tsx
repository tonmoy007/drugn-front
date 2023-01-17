import {BottomTab, colors} from "../../utils/settings";
import {Home} from "./home";
import {MedicineListScreen} from "./medicine-list";
import {NftScreen} from "./nft";
import {AccountScreen} from "./account";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {useTheme} from "react-native-paper";
import {CustomIcon} from "../../utils/custom-icon";

const Tab = createMaterialBottomTabNavigator<BottomTab>()
export const Dashboard = () => {


    const theme = useTheme()
    return <>
        <Tab.Navigator shifting={false} initialRouteName={"Home"} barStyle={{backgroundColor: colors.navBackground}}
                       inactiveColor={colors.inactive}>
            <Tab.Screen name={"Home"} component={Home} options={{
                tabBarIcon: (props) => <CustomIcon name={"home"} size={24} color={props.color}/>
            }}/>
            <Tab.Screen name={"MedicineList"} component={MedicineListScreen}
                        options={{tabBarIcon: (props) => <CustomIcon name={"pill"} size={24} color={props.color}/>}}/>
            <Tab.Screen name={"Nft"} component={NftScreen}
                        options={{tabBarIcon: (props) => <CustomIcon name={"nft"} size={24} color={props.color}/>}}/>
            <Tab.Screen name={"Account"} component={AccountScreen}
                        options={{tabBarIcon: (props) => <CustomIcon name={"user"} size={24} color={props.color}/>}}/>
        </Tab.Navigator>
    </>
}