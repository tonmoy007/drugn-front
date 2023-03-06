interface Props {
    medicines: any,
}

const validateTime = (time)=>{
if(time>=24){
    return time-24;
}
return time;
}
export const userMedTime = async (props: Props) => {
let rtMeds: any = {
    medList: [],
    activeTime: '',
    timeIDs: {morning: [],
        afternoon: [],
        night: [],
        any: []}
}
    if(props.medicines){
        rtMeds.medList = props.medicines
            if (props.medicines.length >0) {
                let tempIDs: any = {
                    morning: [],
                    afternoon: [],
                    night: [],
                    any: []
                };
                const today = {
                    day: new Date().getUTCDay() + 1,
                    time: validateTime(+(new Date().getUTCHours().toLocaleString('en-GB')) + 9),
                }
                for (let i = 0; i < props.medicines.length; i++) {
                    const date = new Date(props.medicines[i].updated_at);
                    //morning
                    if (props.medicines[i].take_medicine_time_type < 4) {
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.morning.push(props.medicines[i]);
                    }
                    //afternoon
                    if (props.medicines[i].take_medicine_time_type > 3 && props.medicines[i].take_medicine_time_type < 9) {
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.afternoon.push(props.medicines[i]);
                    }
                    //night
                    if (props.medicines[i].take_medicine_time_type > 8 && props.medicines[i].take_medicine_time_type < 14) {
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.night.push(props.medicines[i]);
                    }
                    //any
                    if (props.medicines[i].take_medicine_time_type > 14) {
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.any.push(props.medicines[i]);
                    }
                }
                rtMeds.timeIDs = tempIDs;
                console.log(today.time)
                    if (+today.time < 12)
                    rtMeds.activeTime = 'morning'
                    if (+today.time >= 12 && +today.time < 18)
                    rtMeds.activeTime = 'afternoon'
                    if (+today.time >= 18 && +today.time <= 23)
                    rtMeds.activeTime = 'night'
            }
    }
    return rtMeds
};
