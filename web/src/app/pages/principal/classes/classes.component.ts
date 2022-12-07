import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
})
export class ClassesComponent implements OnInit {
  classes: any = [];

  isDropdownHidden: any = { 0: true, 1: true, 2: true };

  isAlertHidden: boolean = true;
  alertMessage: string = "Registration Successful";
  alertType: string = "primary";

  modelTitle: string = "Title";
  modelMsg: string = "Message";
  isModelHidden: string = "hidden";
  constructor() { }

  ngOnInit(): void {
    this.getClasses();
  }

  getClasses = async () => {
    const response = await fetch(`${environment.API_URL}/api/class/getClasses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    this.classes = data._classes;
  }

  deleteClass = async (id: string) => {
    if (confirm("Are you sure you want to delete this class?")) {
      const response = await fetch(`${environment.API_URL}/api/class/deleteClass/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        this.isAlertHidden = false;
        this.alertMessage = "Class deleted successfully";
        this.alertType = "success";
        this.getClasses();
      }
      else {
        this.isAlertHidden = false;
        this.alertMessage = "Class could not be deleted";
        this.alertType = "danger";
      }
    }
  }

  viewModel = async (_class: any) => {
    const response = await fetch(`${environment.API_URL}/api/class/getSubjectTeachers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      },
      body: JSON.stringify({
        subjects: _class.subjects
      })
    });
    const data = await response.json();
    const subjects = data.subjectTeachers;
    this.isModelHidden = "";
    this.modelTitle = "Class Details";
    this.modelMsg = "";
    const modalBody = document.getElementById("modalBody");
    if (modalBody) {
      modalBody.innerHTML = `
      <div class="text-xl m-3 mb-1">Desription</div>
      <div class="text-sm text-gray-600 ml-3">
          ${_class.description}
      </div>
      <div class="text-xl m-3 mb-1">Subjects</div>
      <div class="flex flex-col max-h-44 overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                      </th>
                      <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Teacher
                      </th>
                  </tr>
              </thead>
              <tbody class="bg-white">
                  ${subjects.map((subject: any) => {
                      return `
                        <tr>
                          <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              ${subject.subject}
                          </td>
                          <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              ${subject.teacher}
                          </td>
                        </tr>`;
                  }).join("")}
              </tbody>
          </table>
      </div>
      <div class="text-xl m-3 mb-1">Students</div>
      <div class="flex flex-col max-h-44 overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                  <tr>
                      <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                      </th>
                      <th scope="col" class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Roll No
                      </th>
                  </tr>
              </thead>
              <tbody class="bg-white">
                  ${_class.students.map((student: any) => {
                      return `
                        <tr>
                          <td class="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                              ${student.name}
                          </td>
                          <td class="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              ${student.rollNo}
                          </td>
                        </tr>`;
                  }).join("")}
                  ${_class.students.length === 0 ? `
                  <tr>
                    <td colspan="2" class="p-4 whitespace-nowrap text-center text-sm font-normal text-gray-900">
                        No Students
                      </td>
                    </tr>
                  ` : ""}
              </tbody>
          </table>
      </div>`;
    }
  }

  toggleDropdownHidden(index: number) {
    this.isDropdownHidden[index] = !this.isDropdownHidden[index];
  }

  getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  }

  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }

  closeModel = () => {
    this.isModelHidden = "hidden";
  }
}
