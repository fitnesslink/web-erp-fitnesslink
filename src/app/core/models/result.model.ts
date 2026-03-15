export interface Result<T> {
  isSuccess: boolean;
  value: T | null;
  error: string | null;
  errors: string[];
}
