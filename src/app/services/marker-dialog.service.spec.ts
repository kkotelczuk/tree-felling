/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MarkerDialogService } from './marker-dialog.service';

describe('MarkerDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerDialogService]
    });
  });

  it('should ...', inject([MarkerDialogService], (service: MarkerDialogService) => {
    expect(service).toBeTruthy();
  }));
});
