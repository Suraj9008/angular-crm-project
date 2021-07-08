import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import * as XLSX from 'xlsx';
import { CountryService } from '../../../country.service'
import { Subject } from 'rxjs/Subject';




@Component({
  templateUrl: './demo.component.html',
  selector: 'app-demo',
  styleUrls: ['./demo.component.scss']
})

export class DemoComponent {
  OptionValue:any;
  willDownload = false;
  JsonData = {Sheet1:<any>[]};
  constructor(private getData: CountryService) { }
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject();
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;
  addContact = ['Coantact Type', 'Add Profile', 'Prefix', 'First Name', 'Middle Name', 'Last Name', 'Suffix', 'Preferred Name', 'Gender', 'Date of Birth', 'Email', 'Email Type', 'On Hold', 'Bulk Mailings', 'Select Your Id Type', 'Enter Id No', 'Current Employer', 'Job Title', 'Additional Info', 'Phone', 'Contact Location', 'Instant Messenger', 'IM Location', 'IM Type', 'Social Media Name', 'Username', 'Website', 'Referral Contact', 'Referral ID', 'Testimonials', 'Add Professional Certificates / Credentials/Business Card/Other', 'Employee Status', 'Convenient Time for reaching out to you', 'Level Education', 'Favorite Colour', 'Most Preferred Holiday Destination', 'Favorites Brands', 'Favorite leisure time Activities', 'Most Used Apps', 'Favorite Sites', 'Preferred social Media Platform', 'Native Place', 'Languages known', 'Favorite Niche', 'Preferred Shopping Method', 'Shopping websites preferred other than us', 'Religion', 'Food Type preferred', 'Workout Type preferred', 'Blood Group', 'Charities Related to', 'Close to heart social services', 'Most Important Issue', 'Martial Status', 'Marriage Anniversary Date', 'Family Strength', 'Relation', 'Name', 'Gender', 'Age', 'Working or Dependent', 'Phone Number', 'Email', 'Search Current Address', 'Address Type', 'Primary location for this contact', 'Billing location for this contact', 'Use another contacts address', 'Unit Number', 'Street Number', 'Street Name', 'Street Type', 'Country', 'Select Timezone', 'State', 'City', 'Postal Code', 'Communication Style', 'Salutation Type', 'Privacy', 'Preferred Communication Method', 'Preferred Language', 'Email Format', 'NO BULK EMAILS', 'Tag', 'Group', 'Reference From']

 

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;

    const target: DataTransfer = <DataTransfer>(ev.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx|.csv)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }

    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        this.getData.jsonData.Sheet1 = jsonData.Sheet1;
        //this.JsonData.Sheet1 = JSON.stringify(jsonData.Sheet1);
        // document.getElementById('output').innerHTML = jsonData.slice(0, 300).concat("...");
         this.getData.getJsonData().subscribe(data => this.JsonData.Sheet1 = data)
        this.setDownload(this.JsonData);
        console.log(this.JsonData.Sheet1);
      }
      reader.readAsBinaryString(file);
    }
    else {
      this.inputFile.nativeElement.value = '';
    }
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector("#download");
      el.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(data)}`);
      el.setAttribute("download", 'xlsxtojson.json');
    }, 1000)
  }

  saveData(OptionValue:HTMLSelectElement){
    console.log(OptionValue.value);
  }


}