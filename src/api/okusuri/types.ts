export type GS1CodePayLoad={
    gs1code:string;
}
export type GS1CodeResponse={
    id: number,
    KOUSHIN_KUBUN: string,
    KOUSHIN_YMD: string,
    DATA_TOUROKU_KIGYOMEI: string,
    HANBAIMEI: string,
    HANBAIMEI50ON_1: string,
    HANBAIMEI50ON_2?: string,
    HANBAIMEI50ON_3?: string,
    KOKUJI_BUNRUI: string,
    YAKKA_CODE: string,
    KOUJI_MEISYO: string,
    KOUJI_DATE: string,
    KEIKASOCHI_DATE?: string,
    KIKAKU: string,
    YOBI_1?: string,
    YOBI_2?:string ,
    KUBUN_NAME: string,
    ZAIKEI: string,
    YOUKAIEKI_SEIBUN: string,
    YOUKAIEKI_YOURYO: string,
    YOUKAIEKI_YOURYO_UNIT: string,
    SEIBUTSU_YURAI: string,
    MAYAKU_TYPE: string,
    HOUSOU_KEITAI: string,
    HOUSOU_UNIT: string,
    HOUSOU_UNIT_TYPE: string,
    SOUSUURYO: string,
    SOUSUURYO_UNIT: string,
    ICHIREN_HOUSOU?: string,
    YOBI_3?: string,
    CYOUZAI_HOUSOU_UNIT_CODE: string,
    CYOUZAI_HOUSOU_UNIT_NAME: string,
    CYOUZAI_HOUSOU_UNIT_TYPE?: string,
    HANBAI_HOUSOU_UNIT_CODE: string,
    MOTO_HOUSOU_UNIT_CODE: string,
    JAN_CODE?:string ,
    YOBI_4?: string,
    YOBI_5?:string ,
    YOBI_6?:string ,
    YOBI_7?:string ,
    YOBI_8?: string,
    TAISYOEKI_HOUSOU_INFO_FLAG?: string,
    TAISYOEKI_HOUSOU_INFO?: string,
    HANBAI_STOP_YMD?: string,
    SAISYU_LOT_LIMIT?: string,
    updated_at: string,
    created_at: string,

    message?:string;
    error?:string;
}

export type RegisterPayLoad={
    userId: number;
    medicineId: number;
    takeMedicineIconType: number;
    takeMedicineTimeType: number;
    dose: number;
    medicineName:string;
}
export type RegisterResponse={
    message:string,
    error?:string
}
export type EditPayLoad={
  id: number;
  userId: number;
  medicineId: number;
  takeMedicineIconType: number;
  takeMedicineTimeType: number;
  dose: number;
  medicineName:string;
}
export type EditResponse={
  message:string,
  error?:string
}
export type DeletePayLoad={
    id: number;
  }
  export type DeleteResponse={
    message:string,
    error?:string
  }
export type FetchPayLoad={
    userId: number
  }
export type FetchResponse={
  medicines: any[],
  message:string,
  error?:string
}