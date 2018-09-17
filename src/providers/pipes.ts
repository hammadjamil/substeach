import { Injectable, Pipe,PipeTransform } from '@angular/core';

@Pipe({
    name: "sort"
})
export class MySortPipe {
    transform(items: any[], args: any[]): any {
        if (!items) return [];
        function compare(a, b) {
            if (a.name.trim() < b.name.trim())
                return -1;
            if (a.name.trim() > b.name.trim())
                return 1;
            return 0;
        }

        return items.sort(compare);
    }
}


@Pipe({
    name: "sortDes"
})
export class SortDes {
    transform(items: any[], args: any[]): any {
        if (!items) return [];
        function compare(a, b) {
            if (a > b)
                return -1;
            if (a < b)
                return 1;
            return 0;
        }

        return items.sort(compare);
    }
}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Pipe({
    name: "countrySort"
})
export class countrySort {
    transform(items: any[], args: any[]): any {
        if (!items) return [];
        function compare(a, b) {
            if (a.name.official.trim() < b.name.official.trim())
                return -1;
            if (a.name.official.trim() > b.name.official.trim())
                return 1;
            return 0;
        }

        return items.sort(compare);
    }
}