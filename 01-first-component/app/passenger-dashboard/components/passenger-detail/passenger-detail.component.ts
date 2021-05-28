import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-detail',
    styleUrls: ['passenger-detail.component.scss'],
    template: `
        <div>
            <ul>
                <span class="status" [class.checked-in]="detail.checkedIn"></span>
                <div *ngIf="editing">
                    <input 
                        type="text" 
                        [value]="detail.fullName"
                        (input)="onNameChange(name.value)"
                        #name>
                </div>
                <div *ngIf="!editing">
                    {{ detail.fullName }}
                </div>
                <div class="date">
                    Check in date: {{ detail.checkInDate ? ( detail.checkInDate | date: 'yMMMd' | uppercase ) : 'Not checked in' }}
                </div>
                <div class="children">
                    Children: {{ detail.children?.length || 0 }}
                </div>
                <button (click)="toggleEdit()">
                    {{ editing ? 'Done' : 'Edit' }}
                </button>
                <button (click)="onRemove()">
                    Remove
                </button>
            </ul>
        </div>
    `
})
export class PassengerDetailComponent {
    @Input()
    detail: Passenger;

    @Output()
    edit: EventEmitter<any> = new EventEmitter();

    @Output()
    remove: EventEmitter<any> = new EventEmitter();

    editing: boolean = false;

    constructor() { }

    onNameChange(value: string) {
        this.detail.fullName = value;
    }

    toggleEdit() {
        if (this.editing) {
            this.edit.emit(this.detail);
        }
        this.editing = !this.editing;
    }

    onRemove() {
        this.remove.emit(this.detail);
    }
}