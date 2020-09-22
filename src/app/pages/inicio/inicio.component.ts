import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Game } from '../../interrfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  juegos:any[] =[];
  constructor(private db:AngularFirestore) { }

  ngOnInit(): void {
    this.db.collection('goty').valueChanges()
            .pipe(map( (resp:Game[]) => {
              //return resp.map( ({name,votos}) => ({name,value:votos}))
              return resp.map(juego => ({ name:juego.name, value:juego.votos }))
            }))
            .subscribe(juegos => {
              this.juegos = juegos
            })
  }


}
