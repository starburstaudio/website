import {MigrationInterface, QueryRunner} from "typeorm";

export class addfields1676222738101 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsYoutubeurl` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsTotalsamples` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsFilesize` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsContents` longtext NULL", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsContents`", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsFilesize`", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsTotalsamples`", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsYoutubeurl`", undefined);
   }

}
