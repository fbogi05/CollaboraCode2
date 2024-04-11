import { HungarianDatePipe } from './hungarian-date.pipe';

describe('HungarianDatePipe', () => {
  it('create an instance', () => {
    const pipe = new HungarianDatePipe();
    expect(pipe).toBeTruthy();
  });
});
