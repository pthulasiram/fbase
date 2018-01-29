import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'langTranslator'
})
export class LangTranslatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    return null;
  }

}
