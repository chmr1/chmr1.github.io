import { IEventType } from './event-type.model';

export interface IEventWork {
  id?: string;
  title?: string;
  type?: IEventType;
  author?: string;
  content?: string;
  date?: Date;
  timeStart?: string;
  timeEnd?: string;
  status?: string;
}

export class EventWork implements IEventWork {
  constructor(
    public id?: string,
    public title?: string,
    public type?: IEventType,
    public author?: string,
    public content?: string,
    public date?: Date,
    public timeStart?: string,
    public timeEnd?: string,
    public status?: string
  ) {}
}
