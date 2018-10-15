import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {PlaceSearchModule} from './place-search/place-search.module';
import {MapModule} from './map/map.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaceSearchModule, MapModule],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
