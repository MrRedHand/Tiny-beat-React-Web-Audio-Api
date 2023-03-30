export interface IPlayButton {
  title: string;
  type: 'play' | 'stop';
  onClick: () => void;
}
