const SESSION_STORAGE_TOKEN_KEY_NAME = 'token'

export default class TokenService {
  public static get(): string | null {
    return sessionStorage.getItem(SESSION_STORAGE_TOKEN_KEY_NAME)
  }

  public static set(token: string): void {
    sessionStorage.setItem(SESSION_STORAGE_TOKEN_KEY_NAME, token)
  }

  public static remove(): void {
    sessionStorage.removeItem(SESSION_STORAGE_TOKEN_KEY_NAME)
  }
}
