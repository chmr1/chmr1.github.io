export interface IEventType {
  id?: string;
  description?: string;
  isActive?: boolean;
}

export class EventType implements IEventType {
  constructor(
    public id?: string,
    public description?: string,
    public isActive?: boolean
  ) {}
}
