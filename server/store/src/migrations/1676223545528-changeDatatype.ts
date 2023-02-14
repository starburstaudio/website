import {MigrationInterface, QueryRunner} from "typeorm";

export class changeDatatype1676223545528 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsTotalsamples`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsTotalsamples` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsFilesize`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsFilesize` varchar(255) NULL", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsFilesize`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsFilesize` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `customFieldsTotalsamples`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `customFieldsTotalsamples` int NULL", undefined);
   }

}
