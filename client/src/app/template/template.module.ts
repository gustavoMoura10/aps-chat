import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from '../page/shared/message/message.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NavigationComponent
    ],
    exports: [
        NavigationComponent
    ]
})
export class TemplateModule {

}