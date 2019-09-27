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
    //this.resize(this.files[0]);
    reader.readAsDataURL(this.files[0]);
  }

  resize(file) {
    var reader = new FileReader();
    reader.onload = () => {

      var image = new Image();
      image.onload = () => {
        var max_size = 300;
        var w = image.width;
        var h = image.height;

        if (w > h) {
          if (w > max_size) { h *= max_size / w; w = max_size; }
        } else { if (h > max_size) { w *= max_size / h; h = max_size; } }

        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(image, 0, 0, w, h);

        if (file.type == "image/jpeg") {
          var dataURL = canvas.toDataURL("image/jpeg", 1.0);
          this.data = dataURL;
        } else {
          var dataURL = canvas.toDataURL(file.type);
          this.data = dataURL;
        }
      }
      image.src = reader.result.toString();

    }
    reader.readAsDataURL(file);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
