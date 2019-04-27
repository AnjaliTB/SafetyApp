import { Component } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private smsVar: SMS,private callNumber: CallNumber){}
  
  sendSMS(){
    var options={
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
               intent: 'INTENT'  // Opens Default sms app
              //intent: '' // Sends sms without opening default sms app
            }
    }
    this.smsVar.send('9207578743', 'I am in DANGER!!!!!',options)
      .then(()=>{
        console.log("success");
        
      },()=>{
      console.log("failed");
      
      });
  }
  callnumber(){
    this.callNumber.callNumber("9207578743", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    this.callNumber.callNumber("9207578743", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
