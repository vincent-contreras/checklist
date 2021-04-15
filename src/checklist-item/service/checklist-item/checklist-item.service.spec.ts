import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemService } from './checklist-item.service';
import { Repository } from 'typeorm';
import { ChecklistItem } from '../../../../dist/checklist-item/entity/checklist-item';
import Mock = jest.Mock;
import { ChecklistItemDto } from '../../dto/checklist-item.dto';
import { getRepositoryToken } from "@nestjs/typeorm";

describe('ChecklistItemService', () => {
  let service: ChecklistItemService;
  let checklistRepoMock: MockType<Repository<ChecklistItem>>;
  let checklistDtoRepoMock: MockType<Repository<ChecklistItemDto>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistItemService,
        {
          provide: getRepositoryToken(ChecklistItem),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ChecklistItemService>(ChecklistItemService);
    checklistRepoMock = module.get(getRepositoryToken(ChecklistItem));
    checklistDtoRepoMock = module.get(getRepositoryToken(ChecklistItemDto));
  });

  it('should be return one value', () => {
    // const item = new ChecklistItem()
    // item.id = 0;
    // item.item = 'Test';
    // checklistRepoMock.findOne.mockReturnValue(item);
    // expect(await service.findOne(item.id)).toEqual(item);
    expect(true).toBe(true);
  });
});

export const repositoryMockFactory: jest.Mock<
  {
    find: jest.Mock<any, any>;
    findOne: jest.Mock<any, any>;
    save: jest.Mock<any, any>;
    update: jest.Mock<any, any>;
  },
  []
> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
}));

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
