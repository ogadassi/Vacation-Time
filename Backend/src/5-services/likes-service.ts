import { dal } from "../2-utils/dal";

class LikesService {
  public async addLike(userId: number, vacationId: number): Promise<void> {
    const sql = `insert into likes(userId,vacationId) values(?,?)`;
    await dal.execute(sql, [userId, vacationId]);
  }
  public async removeLike(userId: number, vacationId: number): Promise<void> {
    const sql = `delete from likes where userId=? and vacationId=?`;
    await dal.execute(sql, [userId, vacationId]);
  }
}
export const likesService = new LikesService();
