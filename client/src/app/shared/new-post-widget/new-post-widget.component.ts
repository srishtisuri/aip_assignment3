import { Component, OnInit, OnChanges, EventEmitter, Output, Input } from "@angular/core";

@Component({
  selector: "app-new-post-widget",
  templateUrl: "./new-post-widget.component.html",
  styleUrls: ["./new-post-widget.component.css"]
})
export class NewPostWidgetComponent implements OnInit, OnChanges {
  constructor() { }

  //Declare output parameters for component
  @Output() uploadPost = new EventEmitter();
  @Output() getImage = new EventEmitter();

  //Declare input parameters for component
  @Input() title = "New Post";
  @Input() background = null;

  buttonText = null;
  files: File[] = [];
  data;

  ngOnInit() {
    //Change button text of widget depending on the context that it is used
    if (this.title == "Change Post") {
      this.buttonText = "Change";
    } else if (this.title != "") {
      this.buttonText = "Post";
    }
  }

  //called when an input parameter on component changes
  ngOnChanges(change) {
    //if the background image of the widget changes, clear any files stored locally
    if (change.background !== this.background) {
      this.data = null;
      this.files = [];
    }
  }

  //async function called when Post/Change button is clicked
  post = async () => {
    //call the uploadPost callback to the parent component with the data uploaded to the widget if data exists
    if (this.data) {
      this.uploadPost.emit(this.data);
      this.data = null;
      this.files = [];
    }
  };

  //called when a file is added through the file uploader plugin ngx-dropzone
  onSelect(event) {
    //add the uploaded file to the local files variable
    this.files.push(...event.addedFiles);

    // Read in the file as binary
    let reader = new FileReader();
    let that = this;
    reader.onload = () => {
      that.data = reader.result;
      //Once binary data exists, call getImage callback function to tell parent component 
      //that the widget's image has changed
      this.getImage.emit(that.data);
    };

    //trigger the reader.onload function above
    reader.readAsDataURL(this.files[0]);
  }

  //function to remove images stored locally, when remove button is clicked
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
