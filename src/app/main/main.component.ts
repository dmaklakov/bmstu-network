import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'bc-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tok:string;
  right:string = "right";
  left:string = "left";
  
  title1:string = "Ваши интересы превыше всего!";
  text1:string = "Исходя из ваших предпочтений, мы подберём наиболее " +
  "подходящих по вашим интересам людей, причём вы сами решаете, какой " +
  "именно критерий более значим для вас. Этому способствует поиск по " +
  "интересам, куда можно занести все необходимые параметры.";
  url1:string = "../../images/foto-1.png";

  title2:string = "Сервис доступен каждому";
  text2:string = "В отличие от многих других, наш сервис совершенно " +
  "бесплатный и доступный для каждого. Более того, для пользования " +
  "сайтом от вас не требуется никаких дополнительных данных: достаточно " +
  "войти в свой аккаунт ВК, что делает наш сервис безопасным для использования.";
  url2:string = "../../images/foto-2.png";

  title3:string = "Быстро и безопасно";
  text3:string = "Наш сервис не требует отдельной регистрации, достаточно " +
  "авторизоваться, используя социальную сеть ВКонтакте, предоставив некоторые " +
  "разрешения. Но не переживайте за безопасность: мы не храним данные для входа, " +
  "а в качестве идентификатора хранится уникальный токен, который нельзя подобрать.";
  url3:string = "../../images/foto-3.png";

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.tok = localStorage.getItem('token');
      document.location.href = 'user/' + this.tok;
    }

  }

}
