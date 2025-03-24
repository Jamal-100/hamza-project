export function can(user, permission) {
    return user.permissions.includes(permission);
  }
  
  export function hasRole(user, role) {
    return user?.roles?.includes(role) ?? false;
}

  