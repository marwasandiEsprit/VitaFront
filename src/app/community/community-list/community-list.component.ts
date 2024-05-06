import {Component, OnInit} from '@angular/core';
import {CommunityService} from "../community.service";
import {Community} from "../../models/community";
import {Router} from "@angular/router";

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.css']
})
export class CommunityListComponent implements OnInit {
  communities: Community[] = [];
  searchTerm!: string;

  constructor(private communityService: CommunityService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.communityService.getAllCommunities()
      .subscribe(communities => {
        this.communities = communities;
      });
  }

  joinCommunity(communityId: number): void {
    this.communityService.addUserToCommunity(communityId).subscribe(value => this.router.navigate(['community', value.idCommunity, 'feed']));
  }

  searchCommunity() {
    this.communityService.searchCommunity(this.searchTerm).subscribe(communities => {
      this.communities = communities;
    });
  }

  getRandomInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  }
}
