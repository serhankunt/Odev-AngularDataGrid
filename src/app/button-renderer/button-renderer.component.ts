import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  standalone: true,
  imports: [],
  template:`<button (click)="remove()">Sil</button>
 
  `
})
export class ButtonRendererComponent implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams<any, any, any>): void {
    // throw new Error('Method not implemented.');
    this.params = params;
    this.gridApi = params.api;
  }
  refresh(params: ICellRendererParams<any, any, any>): any {
    // throw new Error('Method not implemented.');
  }

  private params : any ; 
  gridApi :any;

  // agInit(params:any){
  //   this.params = params ;
  // }
  // onRemoveSelected() {
  //   var selectedRowData = this.gridApi.getSelectedRows();
  //   this.gridApi.applyTransaction({ remove: selectedRowData });
  // }

  

  remove(){
   this.gridApi.applyTransaction({remove:[this.params.node.data]})
    alert("deneme")
  }
}
