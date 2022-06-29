import { DOCUMENT } from '@angular/common';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Directive, ElementRef, EventEmitter, HostListener, Inject, Input, NgZone, OnInit, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCaptcha]'
})
export class CaptchaDirective {


  @Output('resultadoCaptcha') resultadoCaptchaEvent = new EventEmitter();
  @Output('deshabilitar') deshabilitarEvent = new EventEmitter()
  @Input('obtenerCapctha') obtenerCaptchaEvent = new EventEmitter();
  deshabilitar:boolean = false;
  captchaGenerado!: string;
  permitted_chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  string_length = 6;
  captchaParaVerificar!:string;
  captchaResult:boolean = false;

  constructor(){

  }

  @HostListener('click')
  onClick() {
    console.log("deshabilitando");
      if(!this.deshabilitar){
        this.deshabilitar = true;
        this.deshabilitarEvent.emit(this.deshabilitar);
      }else{
        this.deshabilitar = false;
        this.deshabilitarEvent.emit(this.deshabilitar);
      }
      
  }


  // @HostListener('load')
  // onLoad(){
  //   console.log("generando captcha");
  //   this.obtenerCaptchaEvent.emit(this.captchaGenerado);
  // }

  // getCaptcha(){
  //   this.captchaGenerado = "";
  //   for (let i = 0; i < 6; i++) { //getting 6 random characters from the array
  //     let randomCharacter = this.permitted_chars[Math.floor(Math.random() * this.permitted_chars.length)];
  //     this.captchaGenerado += randomCharacter; //passing 6 random characters inside captcha innerText
  //   }
  //   console.log(this.captchaGenerado);
  //   this.obtenerCaptchaEvent.emit(this.captchaGenerado);
  //}

  // verificarCaptcha(){
  //   if(this.captchaGenerado == this.captchaParaVerificar){
  //     this.captchaResult = true;
  //   }else{
  //     this.captchaParaVerificar = "";
  //     //this.getCaptcha();
  //   }
  //   this.resultadoCaptchaEvent.emit(this.captchaResult);
  // }

}
