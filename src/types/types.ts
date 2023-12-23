import { ClassEvent, CohortSchedule, Course, CourseResult, FeedbackOnIntern, Intern, FeedbackOnFacilitator } from "@prisma/client";

export interface FilteringParams {
    cohort?: string;
    courseCipher?: string;
}

export interface ClassEventCreateInput {
    meetNumber: number;
    eventDate: Date;
    googleMeetLink: string;
    courseId: number;
    classEventTypeId: number;
}

export interface ClassEventUpdateInput {
    meetNumber?: number;
    eventDate?: Date;
    googleMeetLink?: string;
    courseId?: number;
    classEventTypeId?: number;
};

export interface CourseResultCreateInput {
    internCourseId: number;
    masteryResult: string;
    englishLevel: string;
};

export interface CourseResultUpdateInput {
    internCourseId?: number;
    masteryResult?: string;
    englishLevel?: string;
};

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

export type CohortScheduleType = CohortSchedule | null
export type ClassEventType = ClassEvent | null
export type CourseType = Course | null
export type CourseResultType = CourseResult | null
export type FeedbackOnInternType = FeedbackOnIntern | null
export type InternType = Intern | null
export type FeedbackOnFacilitatorType = FeedbackOnFacilitator | null