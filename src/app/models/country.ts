export class Country {
  countryID!:number|any;
  countryName!:string|any;
  constructor(cid:number,cName:string){
    this.countryID=cid;
    this.countryName=cName;
  }
}
