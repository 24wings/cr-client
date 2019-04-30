import { FirmModule } from './firm.module';

describe('FirmModule', () => {
  let firmModule: FirmModule;

  beforeEach(() => {
    firmModule = new FirmModule();
  });

  it('should create an instance', () => {
    expect(firmModule).toBeTruthy();
  });
});
