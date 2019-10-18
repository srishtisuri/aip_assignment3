import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-new-post-widget",
  templateUrl: "./new-post-widget.component.html",
  styleUrls: ["./new-post-widget.component.css"]
})
export class NewPostWidgetComponent implements OnInit, OnChanges {
  @Output() uploadPost = new EventEmitter();
  @Output() getImage = new EventEmitter();
  @Input() title = "New Post";
  @Input() background = null;

  buttonText = null;
  files: File[] = [];
  data;
  constructor() { }

  ngOnInit() {
    if (this.title == "Change Post") {
      this.buttonText = "Change";
    } else if (this.title != "") {
      this.buttonText = "Post";
    }
  }

  ngOnChanges(change) {
    if (change.background !== this.background) {
      this.data = null;
      this.files = [];
    }
  }

  post = async () => {
    if (this.data) {
      this.uploadPost.emit(this.data);
      this.data = null;
      this.files = [];
    }
  };

  onSelect(event) {
    this.files.push(...event.addedFiles);
    // Read in the file as binary
    let reader = new FileReader();
    let that = this;
    reader.onload = () => {
      that.data = reader.result;
      this.getImage.emit(that.data);
    };
    reader.readAsDataURL(this.files[0]);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
