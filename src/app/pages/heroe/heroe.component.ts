import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel;
  constructor(
    private _heroesService : HeroesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'nuevo') {
      this._heroesService.getHeroById(id)
        .subscribe( (resp: HeroeModel) => {
          this.heroe = resp;
          this.heroe.id = id
        })
    }
  }

  guardar(form : NgForm) {

    if ( form.invalid ) {
        console.log('formulario no valido');
        Swal.fire({
          title: 'Alert',
          text: 'Rellene todos los campos',
          icon: 'error',
          allowOutsideClick: false
        })
        return;
    }

    let peticicion : Observable<any> ;
    
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    })
    Swal.showLoading();

    if( this.heroe.id ) {
      peticicion =  this._heroesService.updateHerore( this.heroe );  
      console.log("Editando..");
      
    } else {
      peticicion = this._heroesService.createHeroe( this.heroe );
      console.log(this.heroe);
      
      console.log("creando...");
    }
    
    peticicion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se Actualizo Correctamente',
        icon: 'success'
      }).then( resp => {
        if (resp.value) {
          this.router.navigateByUrl('/horoes');
        }
      })
    }) 
  }
}
