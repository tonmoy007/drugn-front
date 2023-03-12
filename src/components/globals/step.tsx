import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import { colors } from '../../utils/settings';

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
                <FontAwesome name='check' color={theme.colors.onPrimary} />
            )

        if (step.stepStatus === 'current')
            return (
                <FontAwesome name='circle' color={theme.colors.primary} />
            )
    }

    // const handleStepSwitch = (i) => {
    //     if (props.setStep && i < props.step)
    //         props.setStep(i);
    // }

    return (
        <View style={styles.container}>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    stepCount={props.maxSteps}
                    customStyles={indicatorStyles}
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