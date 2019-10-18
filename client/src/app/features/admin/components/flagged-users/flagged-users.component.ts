import { Component, OnInit, Input } from "@angular/core";
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: "app-flagged-users",
  templateUrl: "./flagged-users.component.html",
  styleUrls: ["./flagged-users.component.css"]
})
export class FlaggedUsersComponent implements OnInit {
  constructor(private userService: UserService) {}
  @Input() users: any;
  @Input() loading: boolean;
  @Input() flaggedIps: any;
  objectKeys = Object.keys

  ngOnInit() {

  }

}
