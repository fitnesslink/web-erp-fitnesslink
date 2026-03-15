export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  alias: string | null;
  username: string;
  country: string | null;
  isActive: boolean;
}

export interface UserDetailDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  alias: string | null;
  phone: string | null;
  username: string;
  country: string | null;
  isActive: boolean;
  preference: UserPreferenceDto | null;
  roles: string[];
}

export interface UserPreferenceDto {
  language: string | null;
  timezone: string | null;
  darkMode: boolean;
  workoutSessionType: number;
}

export interface CreateUserDto {
  firebaseId: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phone?: string | null;
  country?: string | null;
}

export interface UpdateUserDto {
  firstName?: string | null;
  lastName?: string | null;
  alias?: string | null;
  phone?: string | null;
  country?: string | null;
}
