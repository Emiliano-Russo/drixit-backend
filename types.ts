export interface UserClient extends UserDto {
  name: string;
  lastName: string;
  dni: string;
}

export interface UserDto {
  email: string;
  password: string;
}
