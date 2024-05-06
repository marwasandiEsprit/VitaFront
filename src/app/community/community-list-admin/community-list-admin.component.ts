import {Component, TemplateRef} from '@angular/core';
import {CommunityService} from "../community.service";
import {Router} from "@angular/router";
import {Community} from "../../models/community";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {Posts} from "../../models/posts";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-community-list-admin',
  templateUrl: './community-list-admin.component.html',
  styleUrls: ['./community-list-admin.component.css']
})
export class CommunityListAdminComponent {

  communities: Community[] = [];
  status = false;
  modalRef?: BsModalRef;
  communityForm!: FormGroup;
  newPostForm!: FormGroup;

  submitted: boolean = false;
  postFormSubmitted: boolean = false;

  currentFile?: File;
  message = '';

  selectedCommunity!: number;

  fileName = 'Select File';

  constructor(private formBuilder: FormBuilder,
              private communityService: CommunityService, private router: Router, private modalService: BsModalService, private postsService: PostsService) {
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  openCreatePOstModal(template: TemplateRef<void>, communityId: number) {
    this.selectedCommunity = communityId;
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.communityForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.loadCommunities();

    this.newPostForm = this.formBuilder.group({
      postDescription: ['', [Validators.required]],
      post: ['', [Validators.required]],
      imageP: ''
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.communityForm.valid) {
      this.communityService.addCommunity(this.communityForm.value as Community)
        .subscribe(createdCommunity => {
          console.log('Community created successfully:', createdCommunity);
          this.communityForm.reset();
          this.submitted = false;
          this.modalRef?.hide()
          this.ngOnInit()
        });
    } else {
      console.debug("invalid form")
    }
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities()
      .subscribe(communities => {
        this.communities = communities;
      });
  }

  addToggle() {
    this.status = !this.status;
  }

  confirmDelete(id: any): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this Community?');

    if (confirmDelete) {
      this.communityService.deleteCommunity(id).subscribe(value => this.ngOnInit());
    }
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

  async onNewPostSubmit() {
    this.postFormSubmitted = true;
    console.log(this.newPostForm.get('postDescription')?.errors?.['required'])
    if (this.newPostForm.valid) {
      let newPost = {
        post: this.newPostForm.value['post'],
        description: this.newPostForm.value['postDescription'],
      } as Posts

      if (this.currentFile) {
        newPost.imageP = await this.uploadMedia();
      }

      this.postsService
        .addNewPost(newPost, this.selectedCommunity)
        .subscribe()
        // .subscribe(value => this.router
        //   .navigate(['community', this.communityId, 'feed', 'post', value.idPosts]
        //   )
        // );
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
