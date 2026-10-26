import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SalesGrid } from './sales-grid/sales-grid';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';

@NgModule({
  declarations: [App, SalesGrid, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient(), provideClientHydration()],
  bootstrap: [App],
})
export class AppModule {}
