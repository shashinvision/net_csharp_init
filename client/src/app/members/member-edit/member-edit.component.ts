import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/Member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, FormsModule, PhotoEditorComponent],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: any) { // this is to prevent the form from submitting when the user is navigating away from the page, using navigation browser
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }
  member?: Member;
  private accountService = inject(AccountService);
  private membersService = inject(MembersService);
  private toaster = inject(ToastrService);


  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const user = this.accountService.currentUser();

    if(!user) return;

    this.membersService.getMember(user.userName).subscribe({
      next: member => this.member = member
    })

  }
  updateMember() {
    // console.log(this.member)
    this.membersService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toaster.success("Profile updated successfully")
        this.editForm?.reset(this.member) // reset the form when submit an update
      }
    })

  }

}
