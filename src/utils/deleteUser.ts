export function deleteUser(navigate: (path: string) => void, cb?: () => void) {
  localStorage.removeItem("authUser");
  if (cb) cb();
  navigate("/");
}
