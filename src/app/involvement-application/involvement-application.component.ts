import {Component, OnInit, ViewChild} from "@angular/core";
import {InvolvementApplicationRepository} from "./repository/involvement-application.repository";
import {
  Observable, startWith,
  Subject, switchMap,
  takeUntil,
} from "rxjs";
import {SectorRepository} from "./repository/sector.repository";
import {InvolvementApplicationItem} from "./model/involvement-application-item";
import {Sector} from "./model/sector";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgForm} from "@angular/forms";

@Component({
  templateUrl: './involvement-application.component.html',
  styleUrls: ['./involvement-application.component.css']
})
export class InvolvementApplicationComponent implements OnInit {

  @ViewChild('applicationForm')
  private applicationForm!: NgForm;

  involvementApplication$!: Observable<InvolvementApplicationItem>;
  sectors$!: Observable<Sector[]>;

  private componentDestroyed$ = new Subject<void>();
  private reloadApplicationItem$ = new Subject<void>();

  constructor(private involvementApplicationRepository: InvolvementApplicationRepository,
              private sectorRepository: SectorRepository,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.involvementApplication$ = this.reloadApplicationItem$.pipe(startWith(null),
      switchMap(() => this.involvementApplicationRepository.getClientInvolvementApplicationItem())
    )
    this.sectors$ = this.sectorRepository.findAllSectors();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }


  getInvolvementApplicationButtonSubmitButtonText(id?: string) {
    return id ? 'Update application' : 'Submit application';
  }

  submitInvolvementApplication(involvementApplication: InvolvementApplicationItem) {
    this.applicationForm.form.markAllAsTouched()
    if (!this.applicationForm.valid) {
      return;
    }
    if (involvementApplication.id) {
      this.involvementApplicationRepository.changeInvolvementApplication(involvementApplication.id, {
        selectedSectorIds: involvementApplication.selectedSectorIds,
        termsAgree: involvementApplication.termsAgree
      }).pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: () => {
            this.openSnackBar('Application updated successfully!', 'Got it!');
            this.reloadApplicationItem$.next();
          },
          error: () => {
            this.openSnackBar('An error occurred while trying to update application!', 'Close');
          }
        })
    } else {
      this.involvementApplicationRepository.createInvolvementApplication({
        selectedSectorIds: involvementApplication.selectedSectorIds,
        termsAgree: involvementApplication.termsAgree
      }).pipe(takeUntil(this.componentDestroyed$))
        .subscribe({
          next: () => {
            this.openSnackBar('Application created successfully!', 'Got it!');
            this.reloadApplicationItem$.next();
          },
          error: () => {
            this.openSnackBar('An error occurred while trying to create application!', 'Close');
          }
        })
    }
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {duration: 3000, horizontalPosition: "right"})
  }
}
