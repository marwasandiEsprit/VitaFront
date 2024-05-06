import {Component, OnInit} from '@angular/core';
import {Posts} from 'src/app/models/posts';
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.css']
})
export class CommunityPostsComponent implements OnInit {
  posts: Posts[] = [];
  communityId!: number;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.communityId = +params.get('communityId')!;
      this.loadPosts();
    });
  }

  loadPosts(): void {
    // Call the service method to fetch posts based on the communityId
    this.postsService.getCommunityPosts(this.communityId)
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  viewPost(postId: number): void {
    this.router.navigate(['/community', this.communityId, 'feed','post', postId]);
  }
}
