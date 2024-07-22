import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameLogo'
})
export class NameLogoPipe implements PipeTransform {

  transform(nameUser: string): string {
    if (!nameUser) return '';
    return nameUser.charAt(0).toUpperCase();
  }

}
