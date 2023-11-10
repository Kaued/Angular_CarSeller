import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPen, faRectangleList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, map, startWith } from 'rxjs';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { Search } from 'src/app/interfaces/search';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() isLoading: boolean = false;
  @Input() dataSource: Array<any> = [];
  @Input() columns!: ColumnsTable[];
  @Input() actionOrigin!: string;
  @Output() search = new EventEmitter<Search>();

  displayedColumns: string[] = [];
  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;

  searchForm!: FormGroup;
  filteredOptions!: Observable<string[]>;

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
      search: new FormControl("", [Validators.required]),
      type: new FormControl("name", [Validators.required])
    });

    this.filteredOptions = this.searchForm.get("search")!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    const filtered = this.dataSource.filter(option => option["name"].toLowerCase().includes(filterValue));

    const result: string[] = [];
    console.log(value);
    filtered.forEach(item => result.push(item["name"]));

    return result;
  }

  sendChange(){
    this.search.emit()
  }
}
