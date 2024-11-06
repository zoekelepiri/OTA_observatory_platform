import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-home-explore-option',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './home-explore-option.component.html',
  styleUrl: './home-explore-option.component.scss'
})
export class HomeExploreOptionComponent {
  @Input() description!: string;
  @Input() link!: string;
  @Input() icon!: string;
}
