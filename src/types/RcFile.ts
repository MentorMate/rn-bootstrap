export interface RcFile {
  projectUses: RcFileProjectUses;
}

export interface RcFileProjectUses {
  redux: boolean;
  rtkQuery: boolean;
  styledComponents: boolean;
}

export type ProjectRcFile = Partial<RcFile>;
