import { Component } from '@angular/core';
import { LucideAngularModule, Search, Bell, Settings } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  Array = Array;
  Search = Search;
  Bell = Bell;
  Settings = Settings;
}
