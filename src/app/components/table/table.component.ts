import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen, faRectangleList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, map, startWith } from 'rxjs';
import { Actions } from 'src/app/interfaces/actions';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { Search } from 'src/app/interfaces/search';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() isLoading: boolean = false;
  @Input() dataSource: Array<any> = [];
  @Input() columns!: ColumnsTable[];
  @Output() search = new EventEmitter<Search>();
  @Input() term!: string;
  @Input() searchLabel!: string;
  @Input() actions! : Actions[]

  displayedColumns: string[] = [];
  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;

  searchForm!: FormGroup;
  filteredOptions!: Observable<string[]>;

  baseApiUrl: string = `${environment.baseApiUrl}/storage/`;

  ngOnInit() {
    this.columns.forEach(column => {
      this.displayedColumns.push(column.column);
    });
    this.displayedColumns.push("actions");
    console.log(this.displayedColumns);

    this.dataSource.forEach(data => {
      console.log(data);
    });

    this.searchForm = new FormGroup({
      search: new FormControl("")
    });

    this.filteredOptions = this.searchForm.get("search")!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const filtered = this.dataSource.filter(option => option[this.term].toLowerCase().includes(filterValue));

    const result: string[] = [];
    filtered.forEach(item => result.push(item[this.term]));

    return result;
  }

  get valueSearch(){
    return this.searchForm.get("search")!.value
  }

  sendChange(){
    const result : Search = {
      search: this.valueSearch,
      field: this.term
    }
    this.search.emit(result);
  }
}
