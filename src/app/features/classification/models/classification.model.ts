export interface ContentStatusDto {
  id: string;
  name: string;
}

export interface AnatomyDto {
  id: string;
  name: string;
}

export interface EquipmentDto {
  id: string;
  name: string;
}

export interface TrainingLevelDto {
  id: string;
  name: string;
}

export interface RpeDto {
  id: string;
  name: string;
  fromValue: number;
  toValue: number | null;
}
