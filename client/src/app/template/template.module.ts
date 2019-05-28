import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageModule } from '../page/shared/message/message.module';
import { CommonModule } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
    declarations: [
        NavigationComponent
    ],
    exports: [
        NavigationComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AngularFontAwesomeModule
    ]
})
export class TemplateModule {

}