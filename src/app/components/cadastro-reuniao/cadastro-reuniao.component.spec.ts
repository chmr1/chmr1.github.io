import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroReuniaoComponent } from './cadastro-reuniao.component';

describe('CadastroReuniaoComponent', () => {
  let component: CadastroReuniaoComponent;
  let fixture: ComponentFixture<CadastroReuniaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroReuniaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
