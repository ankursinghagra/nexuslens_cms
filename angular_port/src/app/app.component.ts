import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonService } from './_services/common/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'CMS';

  constructor(private bs: CommonService){

  }

  ngOnInit(): void {
    this.bs.getSystemData().subscribe(res=>{
      console.log(res);
      if(res.groups){
        
      }
    });
  }
}
