import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemService } from './checklist-item.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistItemDto } from '../../dto/checklist-item.dto';
import { ChecklistItem } from '../../entity/checklist-item.entity';

const expectedResult = new ChecklistItemDto();
expectedResult.id = 0;
expectedResult.item = 'Test';

const resultArray = [expectedResult];

describe('--- ChecklistItemService ---', () => {
  let service: ChecklistItemService;
  let repo: Repository<ChecklistItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistItemService,
        {
          provide: getRepositoryToken(ChecklistItem),
          useValue: {
            find: jest.fn().mockResolvedValue(resultArray),
            findOne: jest.fn().mockResolvedValue(expectedResult),
            create: jest.fn().mockResolvedValue(expectedResult),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    service = module.get<ChecklistItemService>(ChecklistItemService);
    repo = module.get<Repository<ChecklistItem>>(
      getRepositoryToken(ChecklistItem),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('리스트 조회 할 수 있다', async () => {
    const returnList = await service.findAll();
    expect(returnList).toEqual(resultArray);
  });

  it('아이템 한개 조회', async () => {
    return service
      .findOne({ id: expectedResult.id })
      .then((result: ChecklistItem) => {
        expect(repo.findOne).toHaveBeenCalledWith({
          id: expectedResult.id,
        });
        expect(result).toBe(expectedResult);
      });
  });

  it('Item을 수정할 수 있다', async () => {
    const updatedItem = new ChecklistItemDto();
    updatedItem.id = 1;
    updatedItem.item = 'Go to hell';

    // override original find one function
    repo.findOne = jest.fn().mockResolvedValue(updatedItem);

    return service.updateOne(updatedItem).then((result: ChecklistItemDto) => {
      expect(repo.update).toHaveBeenCalled();
      console.log(result);
      expect(result).toBe(updatedItem);
    });
  });
  it('Item을 삭제할 수 있다', async () => {
    await expect(service.deleteOne(expectedResult.id)).resolves.toEqual({ deleted: true });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});