import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/service.service';
import { IUser } from '../user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { UserDeleteComponent } from '../delete/delete.component';
import {
  MatDialog,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  delete_status = '';

  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'firstName',
    'lastName',
    'activated',
    'createdDate',
    'action',
  ];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private userService: UserService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe({
      next(value) {
          console.log(value);

      },
    })
    this.listUsers();
  }
  openSnackBar() {
    let mess = '';
    if (this.delete_status) {
      mess = this.delete_status;
    }
    this._snackBar.open(mess, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3 * 1000,
    });
  }
  openDialog(username: string): void {
    this.delete_status = '';
    const dialogRef = this.dialog.open(UserDeleteComponent);
    const btnToast = document.getElementById('btn-toast') as HTMLButtonElement;
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.userService.deleteUser(username).subscribe({
            next: () => {
              window.location.reload();
              this.delete_status = 'have been deleted successfully';
              btnToast.click();
            },
            error: () => {
              this.delete_status = 'some thing error please try again !!!';
              btnToast.click();
            },
          });
        }
      },
    });
  }

  listUsers(): void {
    this.userService.listAllUsers().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.users = data;
    });
  }
  doFilter(event: Event): void {
    const inputEle = event.target as HTMLInputElement;
    const value = inputEle.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
