export interface IsEmailAlreadyRegisteredRepository {
  isEmailAlreadyRegistered(email: string): Promise<boolean>
}
