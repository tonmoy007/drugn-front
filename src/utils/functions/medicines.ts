interface Props {
    medicines: any,
}

const validateTime = (time)=>{
if(time>=24){
    return time-24;
}
return time;
}
export const userMedTime =  (props: Props) => {
let rtMeds: any = {
    medList: {
        morning: [],
        afternoon: [],
        night: [],
        any: []
    },
    activeTime: 'afternoon',
    timeIDs: {morning: [],
        afternoon: [],
        night: [],
        any: []}
}   

   const today = {
                    day: new Date().getUTCDay() + 1,
                    time: validateTime(+(new Date().getUTCHours().toLocaleString('en-GB')) + 9),
                }
    if(props.medicines){
            if (props.medicines.length >0) {
                let tempIDs: any = {
                    morning: [],
                    afternoon: [],
                    night: [],
                    any: []
                };
         
                for (let i = 0; i < props.medicines.length; i++) {
                    const date = new Date(props.medicines[i].updated_at);
                    //morning
                    if (props.medicines[i].take_medicine_time_type < 4) {
                        rtMeds.medList.morning.push(props.medicines[i])
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.morning.push(props.medicines[i]);
                    }
                    //afternoon
                    if (props.medicines[i].take_medicine_time_type > 3 && props.medicines[i].take_medicine_time_type < 9) {
                        rtMeds.medList.afternoon.push(props.medicines[i])
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.afternoon.push(props.medicines[i]);
                    }
                    //night
                    if (props.medicines[i].take_medicine_time_type > 8 && props.medicines[i].take_medicine_time_type < 13) {
                        rtMeds.medList.night.push(props.medicines[i])
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.night.push(props.medicines[i]);
                    }
                    //any
                    if (props.medicines[i].take_medicine_time_type >= 13) {
                        rtMeds.medList.any.push(props.medicines[i])
                        if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs.any.push(props.medicines[i]);
                    }
                }
                rtMeds.timeIDs = tempIDs;         
            } 
            if (+today.time>=3 && +today.time < 11)
                    rtMeds.activeTime = 'morning'
                    else if (+today.time >= 11 && +today.time < 16)
                    rtMeds.activeTime = 'afternoon'
                    else
                    rtMeds.activeTime = 'night'
    }
    return rtMeds
};
