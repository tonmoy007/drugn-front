import { registerTranslation, DatePickerModal } from 'react-native-paper-dates';

interface Props {
    startYear: number;
    endYear: number;
    open: boolean;
    date: Date;
    validRange: { startDate: Date, endDate: Date };
    onChange?: (val: object) => void;
    onDismiss?: () => void;
    onConfirm?: (val: object) => void;
}

registerTranslation("jp", {
    save: 'Save',
    selectSingle: '日付を選択',
    selectMultiple: '',
    selectRange: '',
    notAccordingToDateFormat: (inputFormat) =>
        `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later than ${date}`,
    mustBeLowerThan: (date) => `Must be earlier than ${date}`,
    mustBeBetween: (startDate, endDate) =>
        `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: 'Day is not allowed',
    previous: 'Previous',
    next: 'Next',
    typeInDate: 'Type in date',
    pickDateFromCalendar: 'Pick date from calendar',
    close: 'Close',
})


export default function DatePicker(props: Props) {

    return (
        <DatePickerModal
            locale="jp"
            mode="single"
            visible={props.open}
            onDismiss={props.onDismiss ? props.onDismiss : () => { }}
            date={props.date}
            onConfirm={props.onConfirm ? props.onConfirm : () => { }}
            startYear={props.startYear}
            endYear={props.endYear}
            saveLabel={'終わり'}
            saveLabelDisabled={props.onConfirm ? false : true}
            validRange={props.validRange}
            onChange={props.onChange}
        />
    );
}