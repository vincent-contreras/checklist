import { ChecklistItemDto } from './checklist-item.dto';

describe('ChecklistItemDto', () => {
  it('should be defined', () => {
    expect(new ChecklistItemDto('te', 1)).toBeDefined();
  });
});
