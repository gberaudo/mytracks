import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {PlaceSearchModule} from './place-search/place-search.module';
import {MapModule} from './map/map.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaceSearchModule, MapModule, FormsModule],
      declarations: [
        AppComponent, LoginComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
