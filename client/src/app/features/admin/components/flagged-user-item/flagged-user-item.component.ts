import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-flagged-user-item',
  templateUrl: './flagged-user-item.component.html',
  styleUrls: ['./flagged-user-item.component.css']
})
export class FlaggedUserItemComponent implements OnInit {
  @Input() user: any;

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
  }

  deactivate() {
    if (confirm("Are you sure you want to deactivate this user?")) {
      this.userService
        .deactivate(this.user._id)
        .subscribe(response => {
          if(response.status == "SUCCESS") {
            this.user.accountStatus = "deactivated";
            this.notificationService.notify("You have successfully deactivated this user!");
          } else {
            this.notificationService.notify("User is already deactivated!");
          }
        });
    }
  }
}
