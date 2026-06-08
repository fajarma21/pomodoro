export interface InputProps {
  max?: number;
  min?: number;
  step?: number;
  title: string;
  value: string;
  onChange: (value: number) => void;
}
