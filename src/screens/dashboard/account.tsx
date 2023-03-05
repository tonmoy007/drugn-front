import {FBox} from "../../components/globals/fbox";
import {Text} from "react-native-paper";
import UserProfile from "../account/profie";
import UserProfile2 from "../account/profie_2";

export const AccountScreen=({navigation})=>{
    return (
        <>
            {/*<UserProfile navigation={navigation}/>*/}
            <UserProfile2 navigation={navigation}/>
        </>
    )
}