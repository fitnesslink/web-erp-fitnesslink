export interface MovementDto {
  id: string;
  name: string;
  description: string | null;
  statusName: string;
  videoId: string | null;
  imageId: string | null;
  thumbnailId: string | null;
}

export interface MovementListViewDto {
  id: string;
  name: string;
  status: string;
  contributorCompany: string | null;
  contributorUser: string | null;
  totalUsers: number;
  workoutSessions: number;
  thumbnailId: string | null;
  thumbnailUrl: string | null;
}

export interface MovementDetailDto {
  id: string;
  name: string;
  description: string | null;
  statusName: string;
  videoId: string | null;
  contributorName: string | null;
  imageId: string | null;
  thumbnailId: string | null;
}

export interface CreateMovementDto {
  name: string;
  description?: string | null;
  videoId?: string | null;
  statusId: string;
  contributorId?: string | null;
  imageId?: string | null;
  thumbnailId?: string | null;
}

export interface UpdateMovementDto {
  name?: string | null;
  description?: string | null;
  statusId?: string | null;
}
