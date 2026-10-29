abstract class Sender {
  abstract send(): void;
}

class EmailSender extends Sender {
  send(): void {
    console.log("Email sent!");
  }
}

class SmsSender extends Sender {
  send(): void {
    console.log("SMS message sent!");
  }
}

class PushNotificationSender extends Sender {
  send(): void {
    console.log("Push notification sent!");
  }
}