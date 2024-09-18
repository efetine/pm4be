export type JWTPayload = {
  sub: string;
  username: string;
  role: 'ADMIN' | 'USER';
};
