import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {Posts} from "../../models/posts";

@Component({
  selector: 'app-community-post-create',
  templateUrl: './community-post-create.component.html',
  styleUrls: ['./community-post-create.component.css']
})
export class CommunityPostCreateComponent {

  newPostForm: FormGroup;
  communityId: number;

  currentFile?: File;
  message = '';

  fileName = 'Select File';

  formSubmitted = false;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService, private route: ActivatedRoute, private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.communityId = +params.get('communityId')!;
    });

    this.newPostForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      post: ['', [Validators.required]],
      imageP: ''
    });
  }

  selectFile(event: any): void {
    this.message = "";

    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }


  async onSubmit() {
    this.formSubmitted = true;
    console.log(this.newPostForm.get('description')?.errors?.['required'])
    if (this.newPostForm.valid) {
      let newPost = {
        post: this.newPostForm.value['post'],
        description: this.newPostForm.value['post'],
        idOwner: 1
      } as Posts

      if (this.currentFile) {
        newPost.imageP = await this.uploadMedia();
      }

      this.postsService
        .addNewPost(newPost, this.communityId)
        .subscribe(value => this.router
          .navigate(['community', this.communityId, 'feed', 'post', value.idPosts]
          )
        );
    }
  }

  async uploadMedia() {
    return new Promise<string>((resolve, reject) => {
      this.postsService.upload(this.currentFile!).subscribe({
        next: (obj: any) => {
          if (obj instanceof HttpResponse) {
            console.log(obj.body.url);
            resolve(obj.body.url);
          }
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  }


}
