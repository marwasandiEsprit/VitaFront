import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../posts.service";
import {Comments, Posts} from "../../models/posts";
import {PagedResponse} from "../../models/PagedResponse";
import {CommentsService} from "../comments.service";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {StorageService} from "../../_services/storage.service";

@Component({
  selector: 'app-community-post-details',
  templateUrl: './community-post-details.component.html',
  styleUrls: ['./community-post-details.component.css']
})
export class CommunityPostDetailsComponent implements OnInit {

  post!: Posts;
  commentsPage!: PagedResponse<Comments>;
  currentPage = 1;
  newComment!: string;
  sortCriteria = "default"
  ownerId = 1;
  communityId!: number;
  currentUserName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private commentsService: CommentsService,
    private storageService: StorageService
  ) {
    this.currentUserName = this.storageService.getUser()?.username;
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = +params.get('postId')!;
      this.communityId = +params.get('communityId')!;
      this.postsService.postDetails(postId, this.communityId).subscribe(value => this.post = value);
      this.commentsService.getAllCommentsByPage(this.currentPage, postId, this.sortCriteria).subscribe(value => this.commentsPage = value);
    });

  }

  pageChanged($event: PageChangedEvent) {
    this.commentsService
      .getAllCommentsByPage($event.page, this.post.idPosts, this.sortCriteria)
      .subscribe(value => this.commentsPage = value);
  }


  addComment() {
    if (this.newComment) {
      let comment = {comment: this.newComment} as Comments;
      this.commentsService.addNewComment(comment, this.post.idPosts).subscribe(value => this.commentsPage.content.push(value));
    }
  }

  deleteComment(commentId: number) {
    this.commentsService.deleteComment(commentId).subscribe(value => this.ngOnInit());
  }

  deletePost() {
    this.postsService.deletePost(this.post.idPosts).subscribe(value => this.router.navigate(['community', this.communityId, 'feed']))
  }

  loadCommentsByCriteria(criteria: string) {
    this.currentPage = 1;
    this.sortCriteria = criteria;
    this.commentsService
      .getAllCommentsByPage(this.currentPage, this.post.idPosts, this.sortCriteria)
      .subscribe(value => this.commentsPage = value);
  }

  isContentOwner(username: string){
    return this.currentUserName===username;
  }
}
