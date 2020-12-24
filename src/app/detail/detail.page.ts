import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { ToastController } from "@ionic/angular"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public myForm:FormGroup;
  public student: Estudiante;

  constructor(private service: EstudianteService,
              private actroute: ActivatedRoute,
              private router: Router,
              private toast: ToastController,
              private fb:FormBuilder,
              private studentService:EstudianteService) {

                this.actroute.queryParams.subscribe(//Función árbol, afectan el ambito de las variables
                  params => {
                    if(params && params.special){
                      this.student = JSON.parse(params.special) as Estudiante;
                      console.log(this.student);
                    }
                  }
                );
               }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ["",[Validators.required, Validators.minLength(3),Validators.maxLength(150)]],
      controlnumber: ["",[Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      curp: ["",[Validators.required, Validators.pattern('([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9]{2})')]],
      age: [0,[Validators.required]],
      active: [false,[Validators.required]]
    });
  }

  create(){
    this.student={
      name: this.myForm.controls.name.value,
      controlnumber: this.myForm.controls.controlnumber.value,
      age: this.myForm.controls.age.value,
      curp: this.myForm.controls.curp.value,
      active: this.myForm.controls.active.value,
      id: this.student.id
    }

    this.studentService.createStudent(this.student);
  }

}
