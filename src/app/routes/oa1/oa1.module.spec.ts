import { Oa1Module } from './oa1.module';

describe('Oa1Module', () => {
  let oa1Module: Oa1Module;

  beforeEach(() => {
    oa1Module = new Oa1Module();
  });

  it('should create an instance', () => {
    expect(oa1Module).toBeTruthy();
  });
});
