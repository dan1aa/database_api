import moment from 'moment';

import { db } from '@utils/db.server';
import * as CourseService from '@services/course.service';
import { NotFoundError } from '@utils/exeptions/ApiErrors';

export const getCourseDetailsByName = async (courseName: string) => {
    // const courseData = await db.course.findUnique({
    //     where: { course_name: courseName }
    // });

    // if (!courseData) {
    //     throw new NotFoundError(`Course with name ${courseName} doesn't exist`);
    // }

    // const formatedEndDate = moment(courseData.end_date).format('M/D/YYYY');
    // const formatedStartDate = moment(courseData.start_date).format('M/D/YYYY');
    // const courseShedule = await CourseService.getCourseScheduleInfoByCourseId(courseData.id);
    // const courseParticipants = await CourseService.getCourseParticipantsInfoByCourseId(courseData.id); 

    // return {
    //     courseName: coursName,
    //     startDate: formatedStartDate,
    //     endDate: formatedEndDate,
    //     schedule: courseShedule,
    //     participantsInfo: courseParticipants
    // }; 
};

export const getCoursesDetailsList = async (coursesNames: string[]) => {
    // const data = [];
    // const errors = [];
    
    // for (let courseName of coursesNames) {
    //     try {
    //         const courseDetails = await getCourseDetailsByName(courseName);
    //         data.push(courseDetails);
    //     } catch(error) {
    //         data.push({ [courseName]: null });

    //         if (error instanceof NotFoundError) {
    //             errors.push({ msg: error.message }); 
    //         }

    //         //TODO: Explore if error has another instance
    //     }
    // }
    
    // return errors.length > 0 ? { data, errors } : { data };
};