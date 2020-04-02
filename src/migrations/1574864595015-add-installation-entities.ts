import {MigrationInterface, QueryRunner} from "typeorm";

export class addInstallationEntities1574864595015 implements MigrationInterface {
    name = 'addInstallationEntities1574864595015'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `domiibox` (`id` int NOT NULL AUTO_INCREMENT, `idEnOcean` varchar(8) NOT NULL, `uptime` int NOT NULL DEFAULT 0, `mac` varchar(17) NOT NULL, `ip` varchar(15) NOT NULL, `typeConnection` tinyint(1) NOT NULL DEFAULT 0, `sw` varchar(6) NOT NULL, `rf` varchar(6) NOT NULL, `rootfsVersion` varchar(6) NOT NULL, `isActive` tinyint NOT NULL DEFAULT 0, UNIQUE INDEX `IDX_ba54a22c357b40417819b16bda` (`idEnOcean`), UNIQUE INDEX `IDX_777af5bf3bf53dcc9ad939c85d` (`mac`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `service` (`id` int NOT NULL AUTO_INCREMENT, `serviceId` enum ('0', '1') NOT NULL DEFAULT '0', `state` enum ('0', '1', '2', '3') NOT NULL DEFAULT '0', `mode` enum ('0', '1', '2') NOT NULL DEFAULT '0', `areaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `device` (`id` int NOT NULL AUTO_INCREMENT, `deviceName` varchar(20) NOT NULL, `idEnOcean` varchar(8) NOT NULL, `type` enum ('1', '2', '3', '4', '5') NOT NULL DEFAULT '1', `group` int NOT NULL DEFAULT 0, `proprietary` tinyint NOT NULL DEFAULT 0, `rssi` int(3) NOT NULL DEFAULT 0, `value` int NULL DEFAULT 0, `state` int(3) NULL DEFAULT 0, `power` int(3) NULL DEFAULT 0, `energy` int(3) NULL DEFAULT 0, `cost` int(3) NULL DEFAULT 0, `divisor` int(3) NULL DEFAULT 0, `position` int(3) NULL DEFAULT 0, `channel0` int(3) NULL DEFAULT 0, `channel1` int(3) NULL DEFAULT 0, `roomId` int NULL, UNIQUE INDEX `IDX_fae30114290ac2bf4f90750665` (`idEnOcean`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `room` (`id` int NOT NULL AUTO_INCREMENT, `roomType` enum ('-1', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14') NOT NULL DEFAULT '-1', `areaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `area` (`id` int NOT NULL AUTO_INCREMENT, `areaId` tinyint(2) NOT NULL, `label` enum ('-1', '0', '1', '2') NOT NULL DEFAULT '-1', `domiiboxId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `service` ADD CONSTRAINT `FK_7211ddf36aea863667fa23d8bc5` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `device` ADD CONSTRAINT `FK_2f6b7d1366bd53dc977d1aeb2bb` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `room` ADD CONSTRAINT `FK_358d7edc0989b6518d8f3bfcbf8` FOREIGN KEY (`areaId`) REFERENCES `area`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `area` ADD CONSTRAINT `FK_2abb44d33353af5505cd7d1c757` FOREIGN KEY (`domiiboxId`) REFERENCES `domiibox`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `area` DROP FOREIGN KEY `FK_2abb44d33353af5505cd7d1c757`", undefined);
        await queryRunner.query("ALTER TABLE `room` DROP FOREIGN KEY `FK_358d7edc0989b6518d8f3bfcbf8`", undefined);
        await queryRunner.query("ALTER TABLE `device` DROP FOREIGN KEY `FK_2f6b7d1366bd53dc977d1aeb2bb`", undefined);
        await queryRunner.query("ALTER TABLE `service` DROP FOREIGN KEY `FK_7211ddf36aea863667fa23d8bc5`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `area`", undefined);
        await queryRunner.query("DROP TABLE `room`", undefined);
        await queryRunner.query("DROP INDEX `IDX_fae30114290ac2bf4f90750665` ON `device`", undefined);
        await queryRunner.query("DROP TABLE `device`", undefined);
        await queryRunner.query("DROP TABLE `service`", undefined);
        await queryRunner.query("DROP INDEX `IDX_777af5bf3bf53dcc9ad939c85d` ON `domiibox`", undefined);
        await queryRunner.query("DROP INDEX `IDX_ba54a22c357b40417819b16bda` ON `domiibox`", undefined);
        await queryRunner.query("DROP TABLE `domiibox`", undefined);
    }

}
