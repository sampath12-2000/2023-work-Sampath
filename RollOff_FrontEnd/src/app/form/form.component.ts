import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { RollOffService } from '../shared/roll-off.service';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  employeeId:string|null|undefined;
  employee:any={
    globalGroupID:0 ,
    employeeNo: 0,
    name: '',
    localGrade: '',
    mainClient: '',
    email: '',
    joiningDate:new Date,
    projectCode:0 ,
    projectName: '',
    projectStartDate:new Date,
    projectEndDate: new Date,
    peopleManager: '',
    practice: '',
    pspName: '',
    newGlobalPractice: '',
    officeCity: '',
    country: ''
}


  name:string='';
  practice:string='';
  performanceIssue:string='';
    technicalSkill:string='';
    localGrade:string='';
    rollOffEndDate:Date;
    resigned:string='';
    communication:string='';
    primarySkill:string='';
    reasonForRollOff:string='';
    underProbation:string='';
    roleCompetencies:string='';
    projectCode:string='';
    otherReasons:string='';
    longLeave:string='';
    remarks:string='';
    projectName:string='';
    thisReleaseNeedsBackfillIsBackfilled:string='';
    leaveType:string='';
    relevantExperienceYears:string='';

  constructor(public form:FormService,public service:RollOffService,
    private readonly route:ActivatedRoute){
  }

  addEmp=new FormGroup({
    name:new FormControl(''),
    practice:new FormControl(''),
    performanceIssue:new FormControl(''),
    technicalSkill:new FormControl(''),
    localGrade:new FormControl(''),
    rollOffEndDate:new FormControl(''),
    resigned:new FormControl(''),
    communication:new FormControl(''),
    primarySkill:new FormControl(''),
    reasonForRollOff:new FormControl(''),
    underProbation:new FormControl(''),
    roleCompetencies:new FormControl(''),
    projectCode:new FormControl(''),
    otherReasons:new FormControl(''),
    longLeave:new FormControl(''),
    remarks:new FormControl(''),
    projectName:new FormControl(''),
    thisReleaseNeedsBackfillIsBackfilled:new FormControl(''),
    leaveType:new FormControl(''),
    relevantExperienceYears:new FormControl('')
  }
  );
  ngOnInit(): void{
  
    this.route.paramMap.subscribe(
      (params)=>{
        this.employeeId=params.get('id');
        if(this.employeeId){
          this.service.getId(this.employeeId)
          .subscribe(
            (successResponse)=>{
              this.employee=successResponse;
              console.log(this.employee);
            }
          );
        }
      }
    );
  }
  SaveData(){
    
    this.form.createUser(this.addEmp.value).subscribe(result=>{
      console.log(result);
      
    })
    //console.log(this.addEmp.value);
    
  }

    alertWithSuccess(){
      Swal.fire('Form Submitted Successfully', 'success')
    }
    confirmBox(){
      Swal.fire(
        
      
     
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      

}
