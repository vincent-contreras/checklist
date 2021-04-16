import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1618534839194 implements MigrationInterface {
    name = 'FirstMigration1618534839194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `checklist_item` (`id` int NOT NULL AUTO_INCREMENT, `item` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `checklist_item`");
    }

}
