import { TestBed, inject } from '@angular/core/testing';

import { LangTranslatorService } from './lang-translator.service';

describe('LangTranslatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangTranslatorService]
    });
  });

  it('should be created', inject([LangTranslatorService], (service: LangTranslatorService) => {
    expect(service).toBeTruthy();
  }));
});
