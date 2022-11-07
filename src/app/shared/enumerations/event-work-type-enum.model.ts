export enum EventWorkTypeEnum {
  REUNIAO = 'Reunião',
  TESTE = 'Teste',
}

// optional: Record type annotation guaranties that
// all the values from the enum are presented in the mapping
export const EventWorkTypeLabelMapping: Record<EventWorkTypeEnum, string> = {
  [EventWorkTypeEnum.REUNIAO]: EventWorkTypeEnum.REUNIAO,
  [EventWorkTypeEnum.TESTE]: EventWorkTypeEnum.TESTE,
};
