import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Camera, AlertController]
})
export class HomePage {

  myPhoto: any = "assets/imgs/profile.png";
  sourceType: any;


  constructor(public navCtrl: NavController, private camera: Camera, private alertCtrl: AlertController) {
  }

  getPhoto() {
    console.log("clicked");
    let alert = this.alertCtrl.create();
    alert.setTitle('Image Chooser');

    alert.addInput({
      type: 'radio',
      label: 'Camera',
      value: '0',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Photo Library',
      value: '1',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Saved Photo Album',
      value: '2',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        console.log('Radio data:', data);
        switch (data) {
          case '0':
            this.getPicture(this.camera.PictureSourceType.CAMERA);
            break;
          case '1':
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            break;
          case '2':
            this.getPicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM);
            break;
        }

      }
    });
    alert.present();
  }

  getPicture(sourceType: any) {
    const options: CameraOptions = {
      quality: 100,
      correctOrientation: true,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      targetHeight: 1000,
      targetWidth: 1000
    }

    this.camera.getPicture(options).then((imageData) => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {

    });
  }

}
