export class HashService {
  static async hashPassword(password: string) {
    return await Bun.password.hash(password, { algorithm: 'argon2id' })
  }
}