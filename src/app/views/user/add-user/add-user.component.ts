import { Component, OnInit } from '@angular/core';  
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { TaxonomyService } from '../../taxonomy.service'

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
 
export class AddUserComponent implements OnInit{
  name = 'Angular'; 
  media: any    
  productForm: FormGroup;
     
  constructor(private socialMedia:TaxonomyService ,private fb:FormBuilder)

  { 
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
  }  
  ngOnInit(): void {
    this.media = this.socialMedia.showSocialMedia();
  }
    
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(): FormGroup {  
    return this.fb.group({  
      qty: '',  
      price: '',  
    })  
  }  
     
  addQuantity() {  
    this.quantities().push(this.newQuantity());  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {  
    console.log(this.productForm.value);  
  }    
}  