import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextMessageEvent } from '../textMessageBoxFile/textMessageBoxFile.component';

interface Option { 
    id: string;
    text: string 
}

export interface TextMessageBoxEvent {
    prompt: string;
    selectedOption: string;
}

@Component({
    selector: 'app-text-message-box-select',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './textMessageBoxSelect.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent { 

    @Input() placeHolder: string = ''; 
    @Input({required:true}) options!: Option[];
    
    @Output() onMessage = new EventEmitter<TextMessageBoxEvent>();
 
    public file: File | undefined; 
    public fb = inject(FormBuilder);

    public form = this.fb.group({
        prompt : [], 
        file: [null],
        selectedOption: ['',Validators.required]
    }); 

    handleSelectFile( event: any) {
        const file = event.target.files.item(0);
        this.form.controls.file.setValue(file);
        console.log(file)
    }
 
    handleSubmit(){
        if ( this.form.invalid) return;
        const {prompt, selectedOption} = this.form.value;
 
        this.onMessage.emit({prompt: prompt!, selectedOption: selectedOption!});
        this.form.reset();

    }

}
