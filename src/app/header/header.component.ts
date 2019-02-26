import { Component, OnInit, OnDestroy } from '@angular/core';

import { CategoriesService } from '../services/categories.service';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private isLoggedSubscription: Subscription;
  constructor(private categoriesSrv: CategoriesService,
    private storageSrv: StorageService,
    private authSrv: AuthService,
    private adminService: AdminService,
    private toastr: ToastrService) {

    this.isLoggedSubscription = this.authSrv.$isLogged.subscribe( value => {
      this.isLogged = value;
      this.username = this.storageSrv.get('username');
    });

    this.adminService.checkIfAdmin();
    this.adminService.$isAdmin.subscribe(
      response => this.isAdministrator = response
    );
  }

  categories = [];
  isLogged: boolean;
  isAdministrator: boolean;
  username = '';

  ngOnInit() {
    this.getCategories();
  }
  ngOnDestroy() {
    this.isLoggedSubscription.unsubscribe();
  }
  getCategories() {
    this.categoriesSrv.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (err) => this.toastr.error('Server Error!')
    );
  }

  logout() {
    this.authSrv.logOut();
  }
}
