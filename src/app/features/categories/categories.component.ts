import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Categories } from '../../core/models/categories/categories.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
 private readonly categoriesService=inject(CategoriesService);
  categoriesList:WritableSignal<Categories[]>=signal<Categories[]>([])
ngOnInit(): void {
this.getAllCategoriesData();
}
getAllCategoriesData():void{
    this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
this.categoriesList.set(res.data)
    },
    error:(err)=>{
      console.log(err);

    },
  })
}
}
