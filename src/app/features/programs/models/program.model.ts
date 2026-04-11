export interface WorkoutProgramDto {
  id: string;
  name: string;
  description: string | null;
  estimatedTime: number | null;
  statusName: string;
  contributorName: string | null;
}

export interface ProgramListViewDto {
  id: string;
  name: string;
  status: string;
  contributorCompany: string | null;
  contributorUser: string | null;
  estimatedTime: number | null;
  weeks: number;
  totalWorkouts: number;
  totalSessions: number;
  thumbnailId: string | null;
  thumbnailUrl: string | null;
}

export interface WorkoutProgramDetailDto {
  id: string;
  name: string;
  description: string | null;
  estimatedTime: number | null;
  statusName: string;
  contributorName: string | null;
  imageId: string | null;
  thumbnailId: string | null;
  programSchedules: ProgramScheduleDto[];
}

export interface ProgramScheduleDto {
  id: string;
  weekNumber: number;
  dayNumber: number;
  workoutId: string;
  workoutName: string;
}

export interface CreateWorkoutProgramDto {
  name: string;
  description?: string | null;
  estimatedTime?: number | null;
  statusId: string;
  contributorId?: string | null;
  imageId?: string | null;
  thumbnailId?: string | null;
}

export interface UpdateProgramDto {
  name?: string | null;
  description?: string | null;
  estimatedTime?: number | null;
  statusId?: string | null;
}

export interface AddWeeklyWorkoutDto {
  workoutId: string;
  weekNumber: number;
  dayNumber: number;
}
