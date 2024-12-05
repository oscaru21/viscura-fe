export interface Credentials {
    email: string;
    password: string;
  }

export interface RegisterUserRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    roles: ('content manager' | 'photographer' | 'content reviewer')[];
}