import { Component } from '@angular/core';
import { faPen, faRectangleList, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ColumnsTable } from 'src/app/interfaces/columns-table';
import { SellerValues } from 'src/app/interfaces/seller-values';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent {

  isLoading:boolean=false;

  faRectangleList = faRectangleList;
  faPen = faPen;
  faTrash = faTrash;

  columns:ColumnsTable[]=[
    {column: "id", field:"id", name:"Id", type:"text"},
    {column: "name", field:"name", name:"Nome", type:"text"},
    {column: "salary", field:"salary", name:"Salário", type:"money"},
  ]

  actionOrigin = "seller";

  sellersList: SellerValues[] = [
    {
      id:1,
      name:"kaue",
      salary:1000.0
    },
    {
      id: 1,
      name: "felipe",
      salary: 1000.0
    },
    {
      id: 1,
      name: "julho",
      salary: 1000.0
    },
    {
      id: 1,
      name: "pedro",
      salary: 1000.0
    }
  ];

  displayedColumns: string[] = ["id", "name", "salary", "actions"]
}
