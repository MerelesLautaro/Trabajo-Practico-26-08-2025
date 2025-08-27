export class UnauthorizedAccess extends Error {
  constructor () {
    super("Unauthorized Access");
  }
}