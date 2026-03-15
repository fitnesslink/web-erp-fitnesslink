export interface PersonalizationDto {
  id: string;
  name: string;
  alias: string;
  options: PersonalizationOptionDto[];
}

export interface PersonalizationOptionDto {
  id: string;
  description: string;
  trainingLevelName: string | null;
}

export interface UserPersonalizationDto {
  id: string;
  personalizationName: string;
  optionDescription: string;
}
