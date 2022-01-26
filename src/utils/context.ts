import * as React from 'react';

export interface ICurrentLoggedInUser {
  id: string;
  karma: number;
}
export const MeContext = React.createContext<ICurrentLoggedInUser | undefined>(undefined);
