export interface ContributorDto {
  id: string;
  userId: string | null;
  companyId: string | null;
  isApproved: boolean;
  userName: string | null;
  companyName: string | null;
}
