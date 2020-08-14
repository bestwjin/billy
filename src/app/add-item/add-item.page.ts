import { Component, OnInit } from '@angular/core';
import {
  NavController
} from '@ionic/angular';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  constructor(private navCtrl:NavController) { }

  ngOnInit() 
  {

  }

  /**
   * 닫기
   */
  back() {
    this.navCtrl.back();
  }
}
