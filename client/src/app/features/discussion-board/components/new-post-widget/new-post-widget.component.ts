import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { PostService } from "src/app/core/services/post.service";

@Component({
  selector: "app-new-post-widget",
  templateUrl: "./new-post-widget.component.html",
  styleUrls: ["./new-post-widget.component.css"]
})
export class NewPostWidgetComponent implements OnInit {
  @Output() getPosts = new EventEmitter();
  @Input() thread = null;

  files: File[] = [];
  data;
  title = "";
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.title = this.thread == null ? "New Post" : "Add Comment"
  }

  post = async () => {
    if (this.data) {
      if (this.thread == null) {
        this.postService.uploadPost(this.data).subscribe(res => {
          this.getPosts.emit();
          this.data = null;
          this.files = [];
        });
      } else {
        this.postService.uploadComment(this.data, this.thread).subscribe(res => {
          this.getPosts.emit();
          this.data = null;
          this.files = [];
        });
      }
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
