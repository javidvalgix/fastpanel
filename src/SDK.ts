interface Token {
    token: string;
}

interface Data {
    data: object
}

/**
 * Fastpanel SDK Client
 * Usage example:
 * @example
 * const Api = new FClient('my.domain.com', 'fastuser', 'ExamplePassword')
 * @param {string} my.domain.com - Your fastpanel URL
 * @param {string} fastuser - Your fastpanel admin username
 * @param {string} ExamplePassword - Your admin username password
 */
export class FClient {
    url: string;
    user: string;
    password: string;

    constructor(u: string, us: string, pw: string) {
        this.url = u;
        this.user = us;
        this.password = pw;
    }

    async token() {
        try {
            const response = await fetch(`https://${this.url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.user,
                    password: this.password
                })
            });
            const result = await response.json();
            return result.token as Token
        } catch (error) {
            return console.error('Error:', error);
        }
    }

    /**
     * Get all users
     * Usage example:
     * @example
     * await Api.user()
    */
    async users() {
        const response = await fetch(`https://${this.url}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+await this.token()
            }
        });
        const result = await response.json();
        return result.data as Data;
    }

    /**
     * Create a user
     * Usage example:
     * @example
     * await Api.createUser('username', 'userpassword', 'user', quota)
     * @param {string} user - Username (min. length 4)
     * @param {string} password - User password (min. length 6)
     * @param {string} role - User role ('user' or 'reseller')
     * @param {number} quota - Storage quota in MB, for example 2048
    */
    async createUser(user: string, password: string, role: string, quota: number) {
        const roles = ['ROLE_USER', 'ROLE_RESELLER_ADMIN', 'ROLE_SUPER_ADMIN']
        switch(role) {
            case 'user':
                role = 'ROLE_USER'
                break
            case 'reseller':
                role = 'ROLE_RESELLER_ADMIN'
                break
            default:
                role
                break
        }
        if(user.length < 4) { return { error: true, message: "Min. username length 4" } }
        if(password.length < 6) { return { error: true, message: "Min. password length 6" } }
        if(!roles.includes(role)) { return { error: true, message: "Incorrect user role" } }
        const response = await fetch(`https://${this.url}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+await this.token()
            },
            body: JSON.stringify({
                username: user,
                password,
                quota: (quota*1024),
                roles: role
            })
        });
        const result = await response.json();
        return result.data;
    }

    /**
     * Get user by id
     * Usage example:
     * @example
     * await Api.getUser(AnyNumber)
     * @param {number} AnyNumber - User ID
    */
    async getUser(id: number) {
        const response = await fetch(`https://${this.url}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+await this.token()
            }
        });
        const result = await response.json();
        return result.data as Data;
    }
}