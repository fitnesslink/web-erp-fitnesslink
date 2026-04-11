export interface WorkoutDto {
  id: string;
  name: string;
  description: string | null;
  estimatedTime: number;
  statusName: string;
  contributorName: string | null;
  imageId: string | null;
  thumbnailId: string | null;
}

export interface WorkoutListViewDto {
  id: string;
  name: string;
  status: string;
  contributorCompany: string | null;
  contributorUser: string | null;
  estimatedTime: number;
  totalUsers: number;
  totalSessions: number;
  totalMovements: number;
  thumbnailId: string | null;
  thumbnailUrl: string | null;
}

export interface WorkoutDetailDto {
  id: string;
  name: string;
  description: string | null;
  estimatedTime: number;
  statusName: string;
  contributorName: string | null;
  imageId: string | null;
  thumbnailId: string | null;
  tasks: WorkoutTaskDto[];
}

export interface WorkoutTaskDto {
  id: string;
  movementName: string;
  advancedMovementName: string | null;
  reps: number | null;
  sets: number | null;
  restSeconds: number | null;
  intervalSeconds: number | null;
  order: number;
  orderText: string | null;
  workoutTaskTypeId: string;
  workoutPhaseId: string;
}

export interface CreateWorkoutDto {
  name: string;
  description?: string | null;
  statusId: string;
  estimatedTime: number;
  contributorId?: string | null;
  imageId?: string | null;
  thumbnailId?: string | null;
}

export interface UpdateWorkoutDto {
  name?: string | null;
  description?: string | null;
  statusId?: string | null;
  estimatedTime?: number | null;
}

export interface CreateWorkoutTaskDto {
  movementId?: string | null;
  advancedMovementId?: string | null;
  workoutTaskTypeId: string;
  workoutPhaseId: string;
  reps?: number | null;
  sets?: number | null;
  restSeconds?: number | null;
  intervalSeconds?: number | null;
  order: number;
  orderText?: string | null;
}
