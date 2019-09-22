import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-new-post-widget",
  templateUrl: "./new-post-widget.component.html",
  styleUrls: ["./new-post-widget.component.css"]
})
export class NewPostWidgetComponent implements OnInit {
  @Output() getPosts = new EventEmitter();

  files: File[] = [];
  data;
  constructor(private postService: PostService) {}

  ngOnInit() {}

  post = async () => {
    if (this.data) {
      this.postService.uploadPost(this.data).subscribe(res => {
        this.getPosts.emit();
        this.data = null;
        this.files = [];
      });
    }
  };

  onSelect(event) {
    this.files.push(...event.addedFiles);
    // Read in the file as binary
    let reader = new FileReader();
    let that = this;
    reader.onload = () => {
      that.data = reader.result;
    };
    reader.readAsDataURL(this.files[0]);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
