import { dal } from "../2-utils/dal";
import { OkPacketParams } from "mysql2";
import { VacationModel } from "../3-models/vacation-model";
import { ResourceNotFoundError } from "../3-models/client-errors";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "../2-utils/app-config";

class VacationsService {
  public async getVacations(userId: number): Promise<VacationModel[]> {
    const sql = `
    SELECT DISTINCT
    V.*,CONCAT(?, V.imageName) as imageUrl,
    EXISTS(SELECT * FROM likes WHERE V.id = vacationId AND userId = ?) AS isLiked,
    COUNT(L.userId) AS likesCount
FROM vacations as V LEFT JOIN likes as L
ON V.id = L.vacationId
GROUP BY id
ORDER BY startDate
            `;

    const vacations = await dal.execute(sql, [appConfig.baseImageUrl, userId]);

    return vacations;
  }

  public async getOneVacation(id: number): Promise<VacationModel> {
    const sql = `select *,CONCAT(?, imageName) as imageUrl from vacations where id = ?`;

    const vacations = await dal.execute(sql, [appConfig.baseImageUrl, id]);
    if (!vacations[0]) throw new ResourceNotFoundError(id);

    return vacations[0];
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateInsert();

    const imageName = await fileSaver.add(vacation.image);

    const sql = `insert into vacations(destination,description,startDate,endDate,price,imageName)
    values(?,?,?,?,?,?)`;

    const info: OkPacketParams = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
    ]);
    vacation = await this.getOneVacation(info.insertId);

    return vacation;
  }

  public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
    vacation.validateUpdate();

    const oldImageName = await this.getImageName(vacation.id);
    const imageName = vacation.image
      ? await fileSaver.update(oldImageName, vacation.image)
      : oldImageName;

    const sql = `update vacations set destination = ?, description = ?, startDate = ?,endDate = ?, price = ?, imageName = ? where id=?`;

    const info: OkPacketParams = await dal.execute(sql, [
      vacation.destination,
      vacation.description,
      vacation.startDate,
      vacation.endDate,
      vacation.price,
      imageName,
      vacation.id,
    ]);
    if (!info.affectedRows) throw new ResourceNotFoundError(vacation.id);
    vacation = await vacationsService.getOneVacation(vacation.id);

    return vacation;
  }

  public async deleteVacation(id: number): Promise<void> {
    const imageName = await this.getImageName(id);
    const sql = `DELETE FROM vacations WHERE id = ?`;

    const info: OkPacketParams = await dal.execute(sql, [id]);
    if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

    await fileSaver.delete(imageName);
  }

  private async getImageName(id: number): Promise<string> {
    const sql = `SELECT imageName FROM vacations WHERE id = ?`;

    const vacations = await dal.execute(sql, [id]);
    const vacation = vacations[0];
    if (!vacation) return null;
    const imageName = vacation.imageName;

    return imageName;
  }
}

export const vacationsService = new VacationsService();
