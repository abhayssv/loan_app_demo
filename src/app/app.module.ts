import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';  
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient }    from '@angular/common/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastrModule } from 'ngx-toastr';
import { LoaderInterceptor } from './loader.interceptors';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonService } from './shared/common.service'

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    SlimLoadingBarModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }