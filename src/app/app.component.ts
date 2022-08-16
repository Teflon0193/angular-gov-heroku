import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MinisterService } from './minister.service';
import { NgForm } from '@angular/forms';
import { Minister } from './minister';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public ministers: Minister[] = [];
  public editMinister!: Minister;
  public deleteMinister!: Minister;

  constructor(private ministerService: MinisterService) {}
  ngOnInit() {
    this.getMinisters();
  }

  public getMinisters(): void {
    this.ministerService.getMinisters().subscribe(
      (response:Minister[]) => {
        this.ministers =response;
        console.log(this.ministers);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddMinister(addForm: NgForm): void {
    //document.getElementById('add-minister-form').click();
    this.ministerService.addMinister(addForm.value).subscribe(
      (response: Minister) => {
        console.log(response);
        this.getMinisters();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateMinister(minister: Minister): void {
    this.ministerService.updateMinister(minister).subscribe(
      (response: Minister) => {
        console.log(response);
        this.getMinisters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteMinister(ministeId: number): void {
    this.ministerService.deleteMinister(ministeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getMinisters();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchMinisters(key: string): void {
    console.log(key);
    const results: Minister[] = [];
    for (const minister of this.ministers) {
      if (minister.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || minister.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || minister.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || minister.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(minister);
      }
    }
    this.ministers = results;
    if (results.length === 0 || !key) {
      this.getMinisters();
    }
  }

  public onOpenModal(minister: Minister, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addMinisterModal');
    }
    if (mode === 'edit') {
      this.editMinister = minister;
      button.setAttribute('data-target', '#updateMinisterModal');
    }
    if (mode === 'delete') {
      this.deleteMinister = minister;
      button.setAttribute('data-target', '#deleteMinisterModal');
    }
    container!.appendChild(button);
    button.click();
  }


}