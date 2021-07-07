export interface MatchProps {
  match: {
    path?: string;
    url?: string;
    isExact?: boolean;
    params?: { [key: string]: string };
  };
}
