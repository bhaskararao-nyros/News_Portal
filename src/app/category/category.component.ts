import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	categories = [];
	sub_cats = [];
	addCat:boolean = false;
	editCat:boolean = false;
	addSubCat:boolean = false;
	editSubCat:boolean = false;
	addCatText:string;
	addSubCatText:string;
	editSubCatText:string;
	editCatText:string;
	editCatId:string;
	addSubCatId:string;
	editSubCatId:string;
	toggleBtn:boolean;
  errCat:boolean = false;
	indexa:number;

  constructor(private newsService:NewsService) { }

  ngOnInit() {
  	this.newsService.getAllNewsCat().subscribe(cats => this.categories = cats);
  	this.newsService.getAllNewsSubCat().subscribe(sub_cat => {
  		// console.log(sub_cat);
  		this.sub_cats = sub_cat;
  	});
  }

  // Add category toggle text box
  addCategory() {
  	this.addCat = !this.addCat;
  	this.editCat = false;
  	this.addCatText = '';
  }

  // Add category
  addCatOnEnter(e) {
    
  	if (e.keyCode == 13 && this.addCatText !== '') {
  		let cat = this.addCatText;
  		this.newsService.addCategory(cat).subscribe(cats => {
  			this.categories.push(cats);
  		});
  		this.addCat = false;
  	} else {
      this.errCat = true;
    }
  }

  // Delete category
  delCategory(cat_id) {
  	if(window.confirm('Are sure you want to delete this category ?')){
  		this.newsService.deleteCat(cat_id).subscribe(cats => {
  			this.categories = cats;
  			// console.log(cats);
  		});
  	}
  }

  // Edit category text box toggle
  editCategory(cat) {
  	this.editCatText = cat.name;
  	this.editCatId = cat._id;
  	this.editCat = !this.editCat;
  	this.addCat = false;
  }

  // Edit category
  editCatOnEnter(e) {
  	let catName = this.editCatText;
  	let cat_id = this.editCatId;
  	if (e.keyCode == 13) {
  		this.newsService.editCat(cat_id,catName).subscribe(cats => {
				this.categories = cats;
				this.editCat = false;
			});
  	}
  }

  // Toggle up and down arrow
  toggleSubCat(i) {
  	if (i === this.indexa) {
  		this.toggleBtn = !this.toggleBtn;
  		this.indexa = i;
  	} else {
  		this.toggleBtn = true;
  		this.indexa = i;
  	}
  	
  }

  // Add sub category
  addSubCategory(cat_id) {
  	this.addSubCat = !this.addSubCat;
  	this.addSubCatId = cat_id;
  	this.editSubCat = false;
  	this.addSubCatText = '';
  }

  addSubCatOnEnter(e) {
  	let cat_id = this.addSubCatId;
  	let subCatName = this.addSubCatText;

  	if (e.keyCode == 13) {
  		this.newsService.addSubCateogry(cat_id,subCatName).subscribe(sub_cat => {
				this.sub_cats.push(sub_cat);
				// console.log(sub_cat);

				this.addSubCat = false;
			});
  	}
  }

  // Edit sub category toggle text box
  editSubCategory(sub_cat) {
  	this.editSubCat = !this.editSubCat;
  	this.addSubCat = false;
  	this.editSubCatText = sub_cat.name;
  	this.editSubCatId = sub_cat._id;
  }

  // Edit sub category
  editSubCatOnEnter(e) {
  	let sub_cat_id = this.editSubCatId;
  	let subCatName = this.editSubCatText;

  	if (e.keyCode == 13) {
  		this.newsService.editSubCateogry(sub_cat_id,subCatName).subscribe(sub_cat => {
				this.sub_cats = sub_cat;
				// console.log(sub_cat);

				this.editSubCat = false;
			});
  	}
  }

  // Delete sub category
  delSubCategory(sub_cat_id) {
  	if(window.confirm('Are sure you want to delete this sub category ?')){
  		this.newsService.deleteSubCat(sub_cat_id).subscribe(sub_cat => {
  			this.sub_cats = sub_cat;
  			// console.log(sub_cat);
  		});
  	}
  } 
}
