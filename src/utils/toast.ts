import Toast from 'react-native-root-toast';

interface Props {
    msg?: string,
    time?:number
}

export const toastMessage = async (props: Props) => {
    if(props.msg){
        let toast = Toast.show(props.msg, {
        duration: props.time??Toast.durations.LONG,
        position: 0
      })
      if(props.time){
        setTimeout(function hideToast() {
            Toast.hide(toast);
          }, props.time);
      }
    }
};

