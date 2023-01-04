import {TextInput} from "react-native-paper";
import {useEffect, useRef, useState} from "react";
import {
    OTPInputContainer,
    SplitBoxes,
    SplitBoxesFocused,
    SplitBoxText,
    SplitOTPBoxesContainer,
    TextInputHidden
} from "./styled";

interface Props {
    onChange: (val: string) => void
    maximumLength: number
    setIsPinReady: (state: boolean) => void
}

export const OtpInput = (props: Props) => {
    const boxArray = new Array(props.maximumLength).fill(0);
    const [code, setCode] = useState("")
    const inputRef = useRef<HTMLInputElement>();

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    useEffect(() => {
        // update pin ready status
        props.setIsPinReady(code.length === props.maximumLength);
        // clean up function
        props.onChange(code)
        return () => {
            props.setIsPinReady(false);
        };
    }, [code]);
    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === props.maximumLength - 1;
        const isCodeComplete = code.length === props.maximumLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        const StyledSplitBoxes =
            isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
        return (
            <StyledSplitBoxes key={index}>
                <SplitBoxText>{digit}</SplitBoxText>
            </StyledSplitBoxes>
        );
    };
    return (
        <>
            <OTPInputContainer>
                <SplitOTPBoxesContainer onPress={handleOnPress}>
                    {boxArray.map(boxDigit)}
                </SplitOTPBoxesContainer>
                <TextInputHidden
                    autoComplete={"sms-otp"}
                    autoFocus={true}
                    keyboardType={"number-pad"}
                    type={"number"}
                    value={code}
                    onChangeText={setCode}
                    maxLength={props.maximumLength}
                    ref={inputRef}
                    onBlur={handleOnBlur}
                    returnKeyType={"next"}
                />
            </OTPInputContainer>
        </>
    )
}