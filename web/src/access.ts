
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    user: currentUser && currentUser.access === 'user',
  };
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('pro-authority', JSON.stringify(proAuthority));
}

export function removeAuthority(): void {
  return localStorage.removeItem('pro-authority');
}
