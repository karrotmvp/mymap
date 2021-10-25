export class Event {
    constructor(id: number) {
        this._id = id;
    }
    
    _id: number;
    
    public getId() {
        return this._id;
    }
}