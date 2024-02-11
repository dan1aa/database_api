-- CreateTable
CREATE TABLE `Intern` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `explorerId` VARCHAR(50) NOT NULL,
    `explorerMail` VARCHAR(50) NOT NULL,
    `explorerPassword` VARCHAR(50) NOT NULL,
    `discordId` VARCHAR(100) NULL,
    `discordNickname` VARCHAR(50) NULL,
    `cohort` VARCHAR(50) NULL,
    `teachableId` VARCHAR(15) NULL,
    `age` TINYINT NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `country` VARCHAR(50) NOT NULL,
    `timezone` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Intern_email_key`(`email`),
    UNIQUE INDEX `Intern_explorerId_key`(`explorerId`),
    UNIQUE INDEX `Intern_explorerMail_key`(`explorerMail`),
    UNIQUE INDEX `Intern_discordId_key`(`discordId`),
    UNIQUE INDEX `Intern_discordNickname_key`(`discordNickname`),
    UNIQUE INDEX `Intern_teachableId_key`(`teachableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseName` VARCHAR(150) NOT NULL,
    `courseCipher` VARCHAR(50) NOT NULL,
    `linkToClassMaterials` VARCHAR(150) NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_courseCipher_key`(`courseCipher`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meetNumber` TINYINT NOT NULL,
    `eventDate` DATETIME(3) NOT NULL,
    `googleMeetLink` VARCHAR(50) NOT NULL,
    `courseId` INTEGER NOT NULL,
    `classEventTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventFeedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classEventId` INTEGER NOT NULL,
    `feedback` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Badge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `masteryResult` VARCHAR(50) NOT NULL,
    `englishLevel` VARCHAR(50) NOT NULL,
    `internId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedbackOnIntern` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendance` BOOLEAN NOT NULL DEFAULT false,
    `techCheck` VARCHAR(50) NOT NULL,
    `participationActivity` VARCHAR(500) NOT NULL,
    `comment` VARCHAR(300) NULL,
    `internId` INTEGER NOT NULL,
    `classEventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeedbackOnFacilitator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attendance` BOOLEAN NOT NULL DEFAULT false,
    `techCheck` VARCHAR(50) NOT NULL,
    `english` VARCHAR(50) NOT NULL,
    `isEncouraging` BOOLEAN NOT NULL DEFAULT false,
    `isOpenAsked` BOOLEAN NOT NULL DEFAULT false,
    `naturalCommunications` VARCHAR(191) NOT NULL,
    `isPrepared` BOOLEAN NOT NULL DEFAULT false,
    `isCheckedUnderstading` BOOLEAN NOT NULL DEFAULT false,
    `isFacilitatorBrief` BOOLEAN NOT NULL DEFAULT false,
    `publicSpeakingSkills` VARCHAR(130) NOT NULL,
    `isPunctual` BOOLEAN NOT NULL DEFAULT false,
    `isOnTimeAttendanceFeedback` BOOLEAN NOT NULL DEFAULT false,
    `isOptimalScreenPresentation` BOOLEAN NOT NULL DEFAULT false,
    `internId` INTEGER NOT NULL,
    `classEventId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EventInternBadge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classEventId` INTEGER NOT NULL,
    `badgeId` INTEGER NOT NULL,
    `internId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InternCourseRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `internId` INTEGER NOT NULL,
    `classRoleId` INTEGER NOT NULL,

    UNIQUE INDEX `InternCourseRole_courseId_internId_classRoleId_key`(`courseId`, `internId`, `classRoleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassEventType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CohortSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventDate` DATETIME(3) NULL,
    `eventName` VARCHAR(80) NOT NULL,
    `cohort` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassEvent` ADD CONSTRAINT `ClassEvent_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassEvent` ADD CONSTRAINT `ClassEvent_classEventTypeId_fkey` FOREIGN KEY (`classEventTypeId`) REFERENCES `ClassEventType`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventFeedback` ADD CONSTRAINT `EventFeedback_classEventId_fkey` FOREIGN KEY (`classEventId`) REFERENCES `ClassEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseResult` ADD CONSTRAINT `CourseResult_internId_fkey` FOREIGN KEY (`internId`) REFERENCES `Intern`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseResult` ADD CONSTRAINT `CourseResult_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackOnIntern` ADD CONSTRAINT `FeedbackOnIntern_internId_fkey` FOREIGN KEY (`internId`) REFERENCES `Intern`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackOnIntern` ADD CONSTRAINT `FeedbackOnIntern_classEventId_fkey` FOREIGN KEY (`classEventId`) REFERENCES `ClassEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackOnFacilitator` ADD CONSTRAINT `FeedbackOnFacilitator_internId_fkey` FOREIGN KEY (`internId`) REFERENCES `Intern`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeedbackOnFacilitator` ADD CONSTRAINT `FeedbackOnFacilitator_classEventId_fkey` FOREIGN KEY (`classEventId`) REFERENCES `ClassEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventInternBadge` ADD CONSTRAINT `EventInternBadge_classEventId_fkey` FOREIGN KEY (`classEventId`) REFERENCES `ClassEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventInternBadge` ADD CONSTRAINT `EventInternBadge_badgeId_fkey` FOREIGN KEY (`badgeId`) REFERENCES `Badge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventInternBadge` ADD CONSTRAINT `EventInternBadge_internId_fkey` FOREIGN KEY (`internId`) REFERENCES `Intern`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InternCourseRole` ADD CONSTRAINT `InternCourseRole_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InternCourseRole` ADD CONSTRAINT `InternCourseRole_internId_fkey` FOREIGN KEY (`internId`) REFERENCES `Intern`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InternCourseRole` ADD CONSTRAINT `InternCourseRole_classRoleId_fkey` FOREIGN KEY (`classRoleId`) REFERENCES `ClassRole`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
