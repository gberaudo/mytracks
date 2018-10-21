import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceSearchComponent} from './place-search.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MapService} from '../map/map.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlaceSearchService} from './place-search.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

describe('PlaceSearchComponent', () => {
  let component: PlaceSearchComponent;
  let fixture: ComponentFixture<PlaceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatFormFieldModule, MatAutocompleteModule,
        FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [PlaceSearchComponent],
      providers: [MapService, PlaceSearchService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
