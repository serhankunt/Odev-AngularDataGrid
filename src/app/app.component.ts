import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,AgGridModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 rowData : any = [];
 errorMessage : string = "";
 getRowId :any ;

 colDefs:any[] = [
  {
    headerName:"#",
    valueGetter:(params:any)=>params.node.rowIndex+1,
    width:30,
    floatingFilter:false,
    sort:false
  },
  {field:"firstName"},
  {field:"lastName"},
  {field:"profession"},
  {field:"email"},
  {field:"phone"},
  {
    headerName:"İşlemler",
    cellRenderer:ButtonRendererComponent,
    cellRendererParams:{
      label:"Sil"
    }
  }
 ];

 defaultColDef : any = {
  editable : this.checkAuthorization(),
  filter :true,
  onCellValueChanged :(params:any)=> this.update(params),
  floatingFilter:true,
  enableSetEdit:true,
  //cellEditorSelector:true
}

gridOptions : any = {
  overlayLoadingTemplate:
  `<span class="ag-overlay-loading-center">Yükleniyor</span>`,
  // overlayNoRowsTemplate:
  // `<span style="padding: 10px;">errorMessage || 'Gösterilecke herhangi bir veri bulunmamaktadır.'</span>`
  overlayNoRowsTemplate: `<span style="padding: 10px;">Gösterilecek veri bulunmamaktadır.</span>`
}

autoSizeStrategy : any = {
  type: 'fitGridWidth'
};

constructor(private http:HttpClient){
  this.http.get("https://localhost:7253/api/Values/GetAll").subscribe(res=>{
    this.rowData = res;
  })
}

onGridReady(params: any = null) {

    params?.api?.showLoadingOverlay();
    this.getAll();
    
}

checkAuthorization(){
  return true;
}

update(params:any){
  console.log(params.data);
    this.http.post("https://localhost:7253/api/Values/Update",params.data)
    .subscribe(res=>{
    this.getAll();
    })
  }

  getAll(params:any = null){
    this.http.get("https://localhost:7253/api/Values/GetAll").subscribe({
        next:(res:any)=>{
          params?.api?.hideOverlay();
          this.rowData = res;
          if(res.length<=0){
            params?.api?.showNoRowsOverlay();
          }
        },

        error:(err:HttpErrorResponse)=>{
            params?.api?.showNoRowsOverlay();
            params?.api?.hideOverlay();
            console.error("Veri alınamadı. Hata: ", err);
            this.errorMessage = "Veri alınamadı. Hata: " + err.message;
            params.api.setRowData([]);
         
        }
      })
  }

}
