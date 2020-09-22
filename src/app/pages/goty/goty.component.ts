import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import Swal from 'sweetalert2';
import { Game } from '../../interrfaces/interfaces';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {
  juegos:Game[] = [];
  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.gameService.getNominados().subscribe(juegos => {console.log(juegos);this.juegos = juegos});
  }

  votarJuego(juego:Game){    
    this.gameService.votarJuego(juego.id)
                    .subscribe((res:{ok:boolean,mensaje:string}) => {
                      if (res.ok) {
                        Swal.fire('Gracias',res.mensaje,'success')
                      } else {
                        Swal.fire('Error',res.mensaje,'error')
                      }
                    });
  }
}
