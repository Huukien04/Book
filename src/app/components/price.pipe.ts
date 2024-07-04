import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number): string {
    let priceText = "";

    if (price > 999) {
        if (price % 1000 === 0) {
            priceText = (price / 1000).toLocaleString('en-US') + "K";
        } else {
            priceText = (price / 1000).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
        }
    } else {
        priceText = price.toLocaleString('en-US');
    }

    return "$ " + priceText;
}

}
