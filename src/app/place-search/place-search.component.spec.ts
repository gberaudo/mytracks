import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceSearchComponent} from './place-search.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MapService} from '../map/map.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('PlaceSearchComponent', () => {
  let component: PlaceSearchComponent;
  let fixture: ComponentFixture<PlaceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatFormFieldModule, MatAutocompleteModule,
        FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [PlaceSearchComponent],
      providers: [HttpClient, MapService]
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
