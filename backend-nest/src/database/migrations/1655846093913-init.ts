import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1655846093913 implements MigrationInterface {
  name = 'init1655846093913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users"
                                 (
                                     "id"          uuid                     NOT NULL DEFAULT uuid_generate_v4(),
                                     "createdAt"   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "lastUpdated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                                     "firstName"   character varying        NOT NULL,
                                     "lastName"    character varying        NOT NULL,
                                     "email"       character varying        NOT NULL,
                                     "password"    character varying        NOT NULL,
                                     "googleId"    character varying        NOT NULL,
                                     CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                                 )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
