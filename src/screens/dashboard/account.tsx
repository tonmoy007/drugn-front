import {FBox} from "../../components/globals/fbox";
import {Text} from "react-native-paper";
import UserProfile from "../account/profie";

export const AccountScreen=({navigation})=>{
    return (
        <>
            <UserProfile navigation={navigation}/>
        </>
    )
}