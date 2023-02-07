
import styled from "styled-components/native";
import { colors } from "../../utils/settings";

export const OTPInputContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TextInputHidden = styled.TextInput`
  /* width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 50px;
  color: white; */
  position: absolute;
  opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100%;
  align-items: center;
`;
export const SplitBoxes = styled.View`
  border-color: ${colors.grayBorder};
  border-width: 1px;
  border-radius: 5px;
  min-width: calc(25% - 14px );
  min-height: 70px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: ${colors.primaryBorder};
  background-color: transparent;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #000000;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;

export const SplitCircles = styled.View`
  border-color: ${colors.grayBorder};
  border-width: 1px;
  border-radius: 15px;
  width: 30px;
  height: 30px;
`;
export const SplitCircleFilled = styled(SplitCircles)`
  border-width: 0px;
  background-color: ${colors.white};
`;