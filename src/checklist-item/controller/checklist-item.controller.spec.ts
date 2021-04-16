import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemController } from './checklist-item.controller';
import { ChecklistItemDto } from '../dto/checklist-item.dto';
import { ChecklistItemService } from '../service/checklist-item/checklist-item.service';
import { ChecklistItem } from '../entity/checklist-item.entity';

jest.mock('../service/checklist-item/checklist-item.service');

const inputDto = new ChecklistItemDto('Go to school', 1);
const resultItem = new ChecklistItem();
resultItem.id = 1;
resultItem.item = 'Go to school';

const updatedItem = new ChecklistItem();
updatedItem.id = 1;
updatedItem.item = 'Go to hell';

const listResult = [resultItem];

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
    service.create = jest.fn().mockResolvedValue(resultItem);

    return controller.create(resultItem).then((result: ChecklistItemDto) => {
      expect(service.create).toHaveBeenCalled();
      expect(result).toBe(resultItem);
    });
  });

  it('Item을 한개 조회', async () => {
    service.findOne = jest.fn().mockResolvedValue(resultItem);

    return controller.getOne(resultItem.id).then((result: ChecklistItemDto) => {
      expect(service.findOne).toHaveBeenCalledWith({ id: resultItem.id });
      expect(result).toBe(resultItem);
    });
  });

  it('리스트 조회 할 수 있다', async () => {
    service.findAll = jest.fn().mockResolvedValue(listResult);

    return controller.getAll().then((result: []) => {
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(listResult);
    });
  });

  it('Item을 수정할 수 있다', async () => {
    service.updateOne = jest.fn().mockResolvedValue(updatedItem);

    return controller
      .update(resultItem.id, updatedItem)
      .then((result: ChecklistItemDto) => {
        expect(service.updateOne).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });

  it('Item을 삭제할 수 있다', async () => {
    service.deleteOne = jest.fn().mockResolvedValue({ deleted: true });

    return controller.deleteOne(resultItem.id).then((result) => {
      expect(service.deleteOne).toHaveBeenCalled();
      expect(result.deleted).toBe(true);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
