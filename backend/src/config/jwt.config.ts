export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,
  accessExpire: '15m' as const,
  refreshExpire: '7d' as const,
};
