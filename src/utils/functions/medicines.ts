interface Props {
    medicines: any,
}

const validateTime = (time)=>{
if(time>=24){
    return time-24;
}
return time;
}

const hashTime = {
    0: 'morning',
    1: 'morning',
    2: 'morning',
    3: 'morning',
    4: 'afternoon',
    5: 'afternoon',
    6: 'afternoon',
    7: 'afternoon',
    8: 'afternoon',
    9: 'night',
    10: 'night',
    11: 'night',
    12: 'night',
    13: 'afternoon',
    14: 'afternoon',
    15: 'morning',
    16: 'night',
    17: 'afternoon',
    18: 'afternoon',
    19: 'afternoon',
}


export const userMedTime =  (props: Props) => {
let rtMeds: any = {
    medList: {
        morning: [],
        afternoon: [],
        night: [],
    },
    activeTime: 'afternoon',
    timeIDs: {morning: [],
        afternoon: [],
        night: [],
}
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
                };
         
                for (let i = 0; i < props.medicines.length; i++) {
                    const date = new Date(props.medicines[i].updated_at);
                    rtMeds.medList[hashTime[props.medicines[i].take_medicine_time_type]].push(props.medicines[i]);
                    if ((date.getUTCDay() + 1 !== today.day || (props.medicines[i].updated_at === props.medicines[i].created_at)))
                            tempIDs[hashTime[props.medicines[i].take_medicine_time_type]].push(props.medicines[i]);
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
