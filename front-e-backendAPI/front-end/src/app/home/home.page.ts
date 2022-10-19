import { Component } from '@angular/core';
import { UserService } from '../api/user.service';
import { ToastController } from '@ionic/angular';
import { StatusCodes } from 'http-status-codes';
import { Request, Response} from 'express';
import { promise } from 'protractor';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public username: string;
  public password: string;

  constructor(private userService: UserService,
    private toastController: ToastController) {
    this.obterUsuarios();
  }
  
  private obterUsuarios() {
    this.userService.obterUsuarios().then((resultado) => {
      console.log(resultado);
    });
  }

  private async showMessage(message: string): Promise<void>{
    const mensagem = await this.toastController.create({
    message: message, duration: 2000
    });
    mensagem.present();
  }

  // private criarObjetoPass(): any {
  //   const p = {
  //     nome: this.username,
  //     senha: this.password,
  //   };
  //   return p;
  // }

  public  async passAddPost() {
    // 👇️ const response: Response
    const response = await fetch('localhost:3333/users', {
      method: 'POST',
      body: JSON.stringify({
        nome: this.username,
        senha: this.password
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
  });

  }

  public async nextPage(request: Request, response: Response): Promise<void>{
    await fetch('localhost:3333/users')
   .then((response) => StatusCodes.ACCEPTED)
   .catch((response) => StatusCodes.GATEWAY_TIMEOUT);
  }

  public deletePass(id: number): void{
    
    
  }
  
}
