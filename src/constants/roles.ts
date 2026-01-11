export const Role={
  TenantAdmin:"TenantAdmin",
  Admin:"Admin",
  TenantUser:"TenantUser"
} as const;

export type Role = typeof Role[keyof typeof Role];