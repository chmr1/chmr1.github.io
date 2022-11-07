import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EventWork } from 'src/app/interfaces/eventWork';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-cadastro-reuniao',
  templateUrl: './cadastro-reuniao.component.html',
  styleUrls: ['./cadastro-reuniao.component.css']
})
export class CadastroReuniaoComponent implements OnInit {

  teste = true
  eventoId: any = '';
  eventoForm : FormGroup = this.formBuilder.group({
    title: [ null , [Validators.required, Validators.minLength(2) , Validators.maxLength(200)] ],
    type: [ "Reunião" , Validators.required  ],
    author: [ "Administrador" , Validators.required ],
    content: [ null , Validators.maxLength(1000) ] ,
    date: [ null , Validators.required ],
    timeStart: [ null , Validators.required ],
    timeEnd: [ null , Validators.required ],
    status: [ "agendado" , Validators.required ]
  })

  constructor( private router: Router , private activatedRoute:  ActivatedRoute , private formBuilder: FormBuilder, private eventoService: EventoService ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.eventoId = params.get( 'id' );
      if( this.eventoId !== null ){
        this.eventoService.getEvento( this.eventoId  ).subscribe( resposta => this.atualizarCadastro( resposta ) );
      }
    })
  }

  validar( formControl: AbstractControl ): ValidationErrors | null{
    //return null
    return Validators.required(formControl);
  }

  atualizarCadastro( evento : EventWork ): void{
    this.eventoForm.patchValue({
      title: evento.title,
      type: evento.type,
      author: evento.author,
      content: evento.content, 
      date: evento.date,
      timeStart: evento.timeStart,
      timeEnd: evento.timeEnd,
      status: evento.status
    })
  }

  salvar(): void {
    let resposta;
    if( this.eventoId !== null ){
      resposta = this.atualizarEvento();
    }else{
      resposta = this.criarEvento();
    }
    alert(`Evento ${resposta} com sucesso!`)
    this.router.navigate( ['/'] );
  }

  atualizarEvento(): string {
    let dados = this.eventoForm.value;
    dados.id = this.eventoId;
    console.log( dados );
    this.eventoService.updateEvento( dados ).subscribe( resposta => {    
      console.log( "Evento foi atualizado com sucesso", resposta )
    })
    return "atualizado";
  }
  
  criarEvento(): string {
    console.log( this.eventoForm.value );
    this.eventoService.createEvento( this.eventoForm.value ).subscribe( resposta => {
      console.log( "Evento foi criado com sucesso", resposta )
    })
    return "criado";
  }
}
