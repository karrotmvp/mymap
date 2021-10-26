export class Event {
    constructor(id: number, data: any) {
        this._id = id;
        this.data = data;
    }
    
    _id: number;
    data: any;
    
    public getId() {
        return this._id;
    }
}