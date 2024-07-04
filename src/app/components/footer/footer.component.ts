import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit,OnDestroy {
  
  private readonly debounceTimeMs = 1500;
  title = 'CodeSandbox';
  private searchSubject = new Subject<string>();
  inputText: string = '';
  
  onSearch() {
    this.searchSubject.next(this.inputText);
    console.log(this.inputText);
    
  }
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(this.debounceTimeMs)).subscribe((searchValue) => {
      this.performSearch(searchValue);
    });
  }

  ngOnDestroy() {
    this.searchSubject.complete();
  }


  performSearch(searchValue: string) {
    // Perform the actual search operation here
  //  console.log('Performing search for:', searchValue);
    // ... Your search logic ...
  }
}
