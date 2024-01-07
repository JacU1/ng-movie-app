import { MoviesState } from './shared/state/movie.state';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './shared/components/toast/toast.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { ViewedMoviesBoxComponent } from './shared/components/viewed-movies-box/viewed-movies-box.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { LoadingSpinnerInterceptor } from './shared/interceptors/loading-spinner.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NavbarComponent,
    FooterComponent,
    LoadingSpinnerComponent,
    ViewedMoviesBoxComponent,
    ToastComponent,
    HttpClientModule,
  ],
  providers: [
    importProvidersFrom(
      NgxsModule.forRoot(
        [MoviesState],
        {
          developmentMode: !environment.production,
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false
          }
        }
      ),
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true,
   },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
