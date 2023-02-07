import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

interface Props {
    text: string;
    msg: string
    time?:number
}

export const copyToClipboard = async (props: Props) => {
    return await Clipboard.setStringAsync(props.text).then(()=>{
        let toast = Toast.show(props.msg, {
        duration: Toast.durations.LONG,
      });
      if(props.time){
        setTimeout(function hideToast() {
            Toast.hide(toast);
          }, props.time);
      }
      return true;
    }).catch((e)=>{return false});
    
};

export const getClipboardText = async () => {
    const text = await Clipboard.getStringAsync();
    return text;
};

