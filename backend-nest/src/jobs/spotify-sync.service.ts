import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';
import { CategoriesEntity } from '../models/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SpotifySyncService {
  private readonly logger = new Logger(SpotifySyncService.name);

  constructor(
    private readonly spotifyService: SpotifyService,
    @InjectRepository(CategoriesEntity)
    private categoriesEntityRepository: Repository<CategoriesEntity>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async syncCategories() {
    const categories: CategoriesEntity[] =
      await this.spotifyService.getCategories();

    await Promise.all(
      categories.map(async (category) => {
        const categoryFromDb = await this.categoriesEntityRepository.findOne({
          where: {
            spotifyId: category.spotifyId,
          },
        });

        if (!categoryFromDb) {
          await this.categoriesEntityRepository.save(category);
        }
      }),
    );
  }
}
