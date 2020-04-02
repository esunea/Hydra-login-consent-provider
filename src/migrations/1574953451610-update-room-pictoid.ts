import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRoomPictoid1574953451610 implements MigrationInterface {
    name = 'updateRoomPictoid1574953451610'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `room` DROP COLUMN `roomType`", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD `roomName` varchar(50) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD `pictoId` enum ('-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14') NOT NULL DEFAULT '-1'", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `room` DROP COLUMN `pictoId`", undefined);
        await queryRunner.query("ALTER TABLE `room` DROP COLUMN `roomName`", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD `roomType` enum ('-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14') NOT NULL DEFAULT '-1'", undefined);
    }

}
