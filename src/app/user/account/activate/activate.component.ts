import { Component, OnInit } from '@angular/core';
import { ActivateService } from './activate.service';
import { ActivatedRoute } from '@angular/router';
import { tap, mergeMap } from 'rxjs';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent implements OnInit {
  error = false;
  success = false;

  constructor(
    private activateService: ActivateService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.queryParamMap
      .pipe(
        tap({
          next: (data) => {
            console.log(data.get('key'));
          },
        }),
        mergeMap((data) => this.activateService.get(data.get('key')!))
      )
      .subscribe(
        {
          next: () => {
            this.success = true;
          },
          error: (err) => {
            console.log(err);
            this.error = true;
          }
        }
      );
  }
}
