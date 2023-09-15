export interface Intern {
    explorer_id: string;
    discord_id: string;
    first_name: string;
    last_name: string;
    email: string;
    cohort?: string;
}

export interface Course {
    start_date: string;
    end_date: string;
    course_id: string;
}

export interface Nobel_Event {
    course_id: number | string;
    meet_num: number | string;
    event_date: string;
}

export interface Oversight_Feedback {
    event_id: number | string;
    feedback: string;
    attendace: number | string;
}

export interface Facilitator_Feedback {
    event_id: number | string;
    sender_id: number | string;
    receiver_id: number | string;
    feedback: string;
    attendace: number | string;
}

export interface Event_Feedback {
    event_id: number | string;
    sender_id: number | string;
    comment: string;
}