// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class AuthenticationLocalStorage {
	// Token storage handler
	private static readonly TOKEN_KEY = "auth_token";
	private static readonly ROLE_KEY = "user_role";

	/**
	 *
	 * @param token
	 */
	static setToken(token: string) {
		localStorage.setItem(this.TOKEN_KEY, token);
	}

	static getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	static clearToken() {
		localStorage.removeItem(this.TOKEN_KEY);
	}

	/**
	 *
	 * @param role
	 */

	static setRole(role: string) {
		localStorage.setItem(this.ROLE_KEY, role);
	}

	static getRole(): string | null {
		return localStorage.getItem(this.ROLE_KEY);
	}

	static clearRole() {
		localStorage.removeItem(this.ROLE_KEY);
	}
}
