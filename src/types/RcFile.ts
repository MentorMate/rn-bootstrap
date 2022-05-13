export interface RcFile {
  projectUses: RcFileProjectUses;
}

export interface RcFileProjectUses {
  redux: boolean;
  styledComponents: boolean;
}

export type ProjectRcFile = Partial<RcFile>;
