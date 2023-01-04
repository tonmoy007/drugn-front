import {FBox} from "./fbox";
import {Text} from "react-native-paper";

export const StepOf = (props: { total: number, current: number }) => {
    const w = props.current + ' / ' + props.total
    return (
        <>
            <Text  style={{paddingHorizontal: 16, fontSize: 14}}> {w}</Text>
        </>
    )
}