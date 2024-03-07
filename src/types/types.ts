export interface FilteringParams {
    cohort?: string;
    courseCipher?: string;
}

export interface LocationData {
    ip: string;
    hostname: string;
    continent_code: string;
    continent_name: string;
    country_code2: string;
    country_code3: string;
    country_name: string;
    country_capital: string;
    state_prov: string;
    district: string;
    city: string;
    zipcode: string;
    latitude: string;
    longitude: string;
    is_eu: boolean;
    calling_code: string;
    country_tld: string;
    languages: string;
    country_flag: string;
    geoname_id: string;
    isp: string;
    connection_type: string;
    organization: string;
    asn: string;
    currency: {
        code: string;
        name: string;
        symbol: string;
    };
    time_zone: {
        name: string;
        offset: number;
        current_time: string;
        current_time_unix: number;
        is_dst: boolean;
        dst_savings: number;
    }
}

export interface SheetClassEvent {
    courseId: string;
    meetNumber: number;
    eventDate: Date;
    googleMeetLink: string;
}

export interface SheetCourseResult {
    courseId: string;
    internId: string;
    englishLevel: string;
    masteryResult: string;
}

export interface SheetEventFeedback {
    courseId: string;
    meetNumber: number;
    feedback: string;
}

export interface SheetFeedbackOnFacilitator {
    attendance: boolean;
    techCheck: string;
    english: string;
    isEncouraging: boolean;
    isOpenAsked: boolean;
    naturalCommunications: string;
    isPrepared: boolean;
    isFacilitatorBrief: boolean;
    publicSpeakingSkills: string;
    isPunctual: boolean;
    isOnTimeAttendanceFeedback: boolean;
    isOptimalScreenPresentation: boolean;
    internId: string;
    courseId: string;
    meetNumber: number;
    isCheckedUnderstanding: boolean;
    senderId: string;
}

export interface SheetFeedbackOnIntern {
    attendance: boolean;
    techCheck: string;
    participationActivity: string;
    comment: string;
    internId: string;
    courseId: string;
    meetNumber: number;
    senderId: string;
}

export interface DiscordData {
    explorerId?: string | null;
    discordNickname: string;
    discordId?: string | null;
}