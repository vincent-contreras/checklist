import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemController } from './checklist-item.controller';
import { ChecklistItemDto } from '../dto/checklist-item.dto';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistItem } from '../../../dist/checklist-item/entity/checklist-item';
import { Repository } from 'typeorm';

jest.mock('../service/checklist-item/checklist-item.service');

describe('--- ChecklistItemController ---', () => {
  let controller: ChecklistItemController;
  let service: ChecklistItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistItemController],
      providers: [ChecklistItemService],
    }).compile();

    controller = module.get<ChecklistItemController>(ChecklistItemController);
    service = module.get<ChecklistItemService>(ChecklistItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('아이템 한개 조회', async () => {
    const expectedResult = new ChecklistItemDto();
    expectedResult.id = 0;
    expectedResult.item = 'Test';

    service.findOne = jest.fn().mockResolvedValue(expectedResult);

    return controller
      .getOne(expectedResult.id)
      .then((result: ChecklistItemDto) => {
        expect(service.findOne).toHaveBeenCalledWith({ id: expectedResult.id });
        expect(result).toBe(expectedResult);
      });
  });

  it('리스트 조회 할 수 있다', async () => {
    const item1 = new ChecklistItemDto();
    item1.id = 1;
    item1.item = 'Go to school';

    const expectedResult = [item1];

    service.findAll = jest.fn().mockResolvedValue(expectedResult);

    return controller.getAll().then((result: []) => {
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

// export const repositoryMockFactory: jest.Mock<
//   {
//     find: jest.Mock<any, any>;
//     findOne: jest.Mock<any, any>;
//     save: jest.Mock<any, any>;
//     update: jest.Mock<any, any>;
//   },
//   []
// > = jest.fn(() => ({
//   findOne: jest.fn(),
//   find: jest.fn(),
//   update: jest.fn(),
//   save: jest.fn(),
// }));
//
// export type MockType<T> = {
//   [P in keyof T]: jest.Mock<{}>;
// };
