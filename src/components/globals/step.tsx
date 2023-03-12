import {FontAwesome} from '@expo/vector-icons';
import {useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import {colors} from '../../utils/settings';
import {RippleCircle} from "./ripple-circle";

const indicatorStyles = {
    stepIndicatorSize: 20,
    currentStepIndicatorSize: 20,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: colors.grayBorder,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.grayBorder,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: '',
    stepIndicatorCurrentColor: 'initial',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colors.primary,
};
const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.primary,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.primary,
    stepStrokeUnFinishedColor: colors.textSemiDark,
    separatorFinishedColor: colors.primary,
    separatorUnFinishedColor: colors.textSemiDark,
    stepIndicatorFinishedColor: colors.primary,
    stepIndicatorUnFinishedColor: colors.white,
    stepIndicatorCurrentColor: colors.white,
    stepIndicatorLabelFontSize: 12,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: colors.textSemiDark,
    labelSize: 10,
    currentStepLabelColor: colors.primary,
    borderRadiusSize: 10
}

interface Props {
    step: number;
    maxSteps: number;
    setStep?: (val: number) => void
}

export default function StepTracker(props: Props) {
    const theme = useTheme();

    const renderIndicator = (step) => {
        if (step.stepStatus === 'finished')
            return (
                <FontAwesome name='check' color={theme.colors.onPrimary}/>
            )

        if (step.stepStatus === 'current')
            return (
                <RippleCircle key={"animated-circle"} maxScale={2}>
                    <Text style={{color: colors.primary, fontWeight: "bold", fontSize: 12}}>{step.position + 1}</Text>
                </RippleCircle>
            )
        if (step.stepStatus === "unfinished") {
            return (
                <Text style={{color: colors.primary, fontWeight: "bold", fontSize: 12}}>{step.position + 1}</Text>
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    stepCount={props.maxSteps}
                    customStyles={customStyles}
                    currentPosition={props.step}
                    renderStepIndicator={renderIndicator}
                    labels={[]}
                    // onPress={handleStepSwitch}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stepIndicator: {
        marginVertical: 10,
    }
});