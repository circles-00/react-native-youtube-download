import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPlaylists1656025753407 implements MigrationInterface {
  name = 'AlterPlaylists1656025753407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "playlists" ADD "description" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "playlists" DROP COLUMN "description"`,
    );
  }
}
