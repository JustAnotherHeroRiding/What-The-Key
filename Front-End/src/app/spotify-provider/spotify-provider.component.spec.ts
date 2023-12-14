import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyProviderComponent } from './spotify-provider.component';

describe('SpotifyProviderComponent', () => {
  let component: SpotifyProviderComponent;
  let fixture: ComponentFixture<SpotifyProviderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpotifyProviderComponent]
    });
    fixture = TestBed.createComponent(SpotifyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
