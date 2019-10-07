import { Component, Input, OnInit } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";
import { NotificationService } from "src/app/core/services/notification.service";

@Component({
  selector: "app-reported-post-item",
  templateUrl: "./reported-post-item.component.html",
  styleUrls: ["./reported-post-item.component.css"]
})
export class ReportedPostItemComponent implements OnInit {
  @Input() post: any;
  mostPopularReason;

  constructor(private postService: PostService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.getMostPopularReason();
  }
  getMostPopularReason() {
    let inappropriate = 0;
    let text = 0;
    this.post.report.reasons.forEach(reason => {
      if (reason.reason == "inappropriate") {
        inappropriate++;
      } else if (reason.reason == "text") {
        text++;
      }
    });
    if (inappropriate > text) {
      this.mostPopularReason = "Inappropriate Content";
    } else {
      this.mostPopularReason = "Image Contains Text";
    }
  }

  remove() {
    if (confirm("Are you sure you want to remove this post?")) {
      this.postService.changePost(window.location.origin + "/assets/removed_image.png", this.post._id, true).subscribe(response => {
        this.post = response.data;
        this.notificationService.notify("You have successfully removed this post!");
      });
    }
  }
}
