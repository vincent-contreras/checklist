import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemController } from './checklist-item.controller';
import { ChecklistItemDto } from '../dto/checklist-item.dto';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';

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

  it('Item을 추가할 수 있다', async () => {
    const item1 = new ChecklistItemDto();
    item1.id = 1;
    item1.item = 'Go to school';

    service.create = jest.fn().mockResolvedValue(item1);

    return controller.create(item1).then((result: ChecklistItemDto) => {
      expect(service.create).toHaveBeenCalled();
      expect(result).toBe(item1);
    });
  });

  it('Item을 한개 조회', async () => {
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

  it('Item을 수정할 수 있다', async () => {
    const item1 = new ChecklistItemDto();
    item1.id = 1;
    item1.item = 'Go to school';

    const updatedItem = new ChecklistItemDto();
    updatedItem.id = 1;
    updatedItem.item = 'Go to hell';

    service.updateOne = jest.fn().mockResolvedValue(updatedItem);

    return controller
      .update(item1.id, updatedItem)
      .then((result: ChecklistItemDto) => {
        expect(service.updateOne).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });

  it('Item을 삭제할 수 있다', async () => {
    const item1 = new ChecklistItemDto();
    item1.id = 1;
    item1.item = 'Go to school';

    service.deleteOne = jest.fn().mockResolvedValue({ deleted: true });

    return controller.deleteOne(item1.id).then((result) => {
      expect(service.deleteOne).toHaveBeenCalled();
      expect(result.deleted).toBe(true);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
