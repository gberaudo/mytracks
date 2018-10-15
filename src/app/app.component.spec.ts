import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MapComponent} from './map/map.component';
import {PlaceSearchComponent} from './place-search/place-search.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MapComponent,
        PlaceSearchComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
